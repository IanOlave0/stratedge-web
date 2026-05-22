import 'dotenv/config';
import { createServer } from 'node:http';
import { createToken, revokeToken, verifyToken } from './auth.js';
import { dbConfig, initDatabase, pool, verifyPassword } from './db.js';
import { validateLead, validateProject } from './validation.js';

const PORT = Number(process.env.PORT || 4000);
const ALLOWED_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const rateLimit = new Map();

// Respuesta JSON estandar de la API. Tambien agrega CORS y headers basicos
// de seguridad para todas las rutas.
const json = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(res.req?.headers.origin) ? res.req.headers.origin : 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
  });
  res.end(JSON.stringify(data));
};

// Lee el cuerpo de una peticion y lo convierte de JSON a objeto JavaScript.
const readBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
};

// Extrae el token Bearer enviado por el frontend en el header Authorization.
const getToken = (req) => {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : '';
};

// Protege rutas privadas. Si el token no es valido, bloquea la peticion.
const requireAdmin = (req, res) => {
  const token = getToken(req);
  const admin = verifyToken(token);
  if (!admin) {
    json(res, 401, { error: 'No autorizado.' });
    return null;
  }
  return { admin, token };
};

// Limite simple de solicitudes por direccion IP para reducir abuso basico.
const allowRequest = (req) => {
  const key = req.socket.remoteAddress || 'local';
  const now = Date.now();
  const current = rateLimit.get(key) || [];
  const recent = current.filter((time) => now - time < 60_000);
  recent.push(now);
  rateLimit.set(key, recent);
  return recent.length <= 80;
};

// Ejecuta consultas parametrizadas en MySQL usando el pool compartido.
const query = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

// Confirma que el servicio seleccionado en el cotizador exista en la base.
const serviceExists = async (id) => {
  const rows = await query('SELECT id FROM services WHERE id = ?', [id]);
  return rows.length > 0;
};

// Controlador principal: identifica la ruta solicitada y ejecuta su logica.
const handle = async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, 204, {});
  if (!allowRequest(req)) return json(res, 429, { error: 'Demasiadas solicitudes. Intenta mas tarde.' });

  const url = new URL(req.url, `http://${req.headers.host}`);
  const routeKey = `${req.method} ${url.pathname}`;

  if (routeKey === 'GET /api/health') {
    return json(res, 200, { ok: true, database: dbConfig.database, engine: 'MySQL' });
  }

  // Rutas publicas usadas por la pagina principal.
  if (routeKey === 'GET /api/services') {
    const rows = await query('SELECT id, name, category, base_price AS basePrice, description FROM services ORDER BY category, name');
    return json(res, 200, rows);
  }

  if (routeKey === 'GET /api/portfolio') {
    const rows = await query('SELECT id, title, client, category, description, image, created_at AS createdAt FROM portfolio_projects ORDER BY id DESC');
    return json(res, 200, rows);
  }

  if (routeKey === 'POST /api/auth/login') {
    // Login administrativo: compara la contrasena con el hash guardado.
    const body = await readBody(req);
    const admins = await query('SELECT id, username, password_hash AS passwordHash FROM admins WHERE username = ?', [body.username]);
    const admin = admins[0];
    if (!admin || !verifyPassword(String(body.password || ''), admin.passwordHash)) {
      return json(res, 401, { error: 'Usuario o contrasena incorrectos.' });
    }
    return json(res, 200, { token: createToken(admin), username: admin.username });
  }

  if (routeKey === 'POST /api/auth/logout') {
    revokeToken(getToken(req));
    return json(res, 200, { ok: true });
  }

  if (routeKey === 'POST /api/leads') {
    // Guarda una solicitud de cotizacion despues de validar los datos.
    const body = await readBody(req);
    const { value, errors } = validateLead(body);
    if (Object.keys(errors).length) return json(res, 400, { errors });
    if (!(await serviceExists(value.serviceId))) return json(res, 400, { errors: { serviceId: 'Servicio no encontrado.' } });
    const services = await query('SELECT base_price AS basePrice FROM services WHERE id = ?', [value.serviceId]);
    const estimatedTotal = services[0].basePrice;
    const [result] = await pool.execute(
      `INSERT INTO leads (full_name, email, phone, zip_code, company, campaign_start, social_links, message, service_id, estimated_total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [value.fullName, value.email, value.phone, value.zipCode || null, value.company || null, value.campaignStart || null, value.socialLinks || null, value.message || null, value.serviceId, estimatedTotal],
    );
    return json(res, 201, { id: result.insertId, estimatedTotal, status: 'Nueva solicitud' });
  }

  if (routeKey === 'GET /api/leads') {
    // Listado privado de solicitudes para el panel de administracion.
    if (!requireAdmin(req, res)) return;
    const rows = await query(`
      SELECT leads.id, full_name AS fullName, email, phone, zip_code AS zipCode, company,
             campaign_start AS campaignStart, social_links AS socialLinks, message,
             service_id AS serviceId, services.name AS serviceName,
             estimated_total AS estimatedTotal, leads.status, leads.created_at AS createdAt
      FROM leads
      JOIN services ON services.id = leads.service_id
      ORDER BY leads.id DESC
    `);
    return json(res, 200, rows);
  }

  const leadStatusMatch = url.pathname.match(/^\/api\/leads\/(\d+)\/status$/);
  if (req.method === 'PUT' && leadStatusMatch) {
    // Cambia el estado comercial de una solicitud existente.
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const allowed = ['Nueva solicitud', 'Contactado', 'En cotizacion', 'Cliente activo', 'Cerrado'];
    if (!allowed.includes(body.status)) return json(res, 400, { error: 'Estatus invalido.' });
    const [result] = await pool.execute('UPDATE leads SET status = ? WHERE id = ?', [body.status, leadStatusMatch[1]]);
    return json(res, result.affectedRows ? 200 : 404, { ok: Boolean(result.affectedRows) });
  }

  if (routeKey === 'POST /api/portfolio') {
    // Permite al administrador publicar nuevos proyectos en el portafolio.
    if (!requireAdmin(req, res)) return;
    const { value, errors } = validateProject(await readBody(req));
    if (Object.keys(errors).length) return json(res, 400, { errors });
    const [result] = await pool.execute(
      'INSERT INTO portfolio_projects (title, client, category, description, image) VALUES (?, ?, ?, ?, ?)',
      [value.title, value.client, value.category, value.description, value.image],
    );
    return json(res, 201, { id: result.insertId, ...value });
  }

  const projectMatch = url.pathname.match(/^\/api\/portfolio\/(\d+)$/);
  if (req.method === 'DELETE' && projectMatch) {
    // Elimina proyectos del portafolio desde el panel privado.
    if (!requireAdmin(req, res)) return;
    const [result] = await pool.execute('DELETE FROM portfolio_projects WHERE id = ?', [projectMatch[1]]);
    return json(res, result.affectedRows ? 200 : 404, { ok: Boolean(result.affectedRows) });
  }

  return json(res, 404, { error: 'Ruta no encontrada.' });
};

// Arranca la API despues de preparar la base de datos.
const start = async () => {
  await initDatabase();
  createServer((req, res) => {
    handle(req, res).catch((error) => {
      json(res, 500, { error: 'Error interno del servidor.', detail: error.message });
    });
  }).listen(PORT, () => {
    console.log(`API Agencia Digital MX en http://localhost:${PORT}`);
    console.log(`Base de datos MySQL: ${dbConfig.database}`);
  });
};

start().catch((error) => {
  console.error('No se pudo iniciar la API MySQL:', error.message);
  process.exit(1);
});
