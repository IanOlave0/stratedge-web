import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'node:crypto';
import mysql from 'mysql2/promise';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const schemaPath = join(rootDir, 'database', 'schema.sql');

// Configuracion central de MySQL. Los valores se leen desde .env para no
// escribir credenciales reales directamente en el codigo fuente.
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'stratedge_db',
  multipleStatements: false,
};

// Pool de conexiones reutilizables. Esto evita abrir una conexion nueva por
// cada consulta y mejora el rendimiento de la API.
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});

// Genera el hash de la contrasena del administrador con salt unico.
// No se guarda la contrasena original: solo el formato "salt:hash".
const adminPasswordHash = (password, salt = randomBytes(16).toString('hex')) => {
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

// Verifica contrasenas recalculando el hash y comparandolo de forma segura.
// timingSafeEqual reduce riesgos de ataques por tiempos de respuesta.
export const verifyPassword = (password, storedHash) => {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;
  const candidateHash = adminPasswordHash(password, salt).split(':')[1];
  const storedBuffer = Buffer.from(hash, 'hex');
  const candidateBuffer = Buffer.from(candidateHash, 'hex');
  if (storedBuffer.length !== candidateBuffer.length) return false;
  return timingSafeEqual(storedBuffer, candidateBuffer);
};

// Ejecuta el script SQL que crea la base, tablas y datos iniciales.
const runSchema = async () => {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    multipleStatements: true,
  });

  await connection.query(readFileSync(schemaPath, 'utf8'));
  await connection.end();
};

// Inicializa la base y crea el usuario administrador solo si no existe.
export const initDatabase = async () => {
  await runSchema();
  const [admins] = await pool.query('SELECT id FROM admins WHERE username = ?', ['admin']);
  if (admins.length === 0) {
    await pool.query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [
      'admin',
      adminPasswordHash('Admin123!'),
    ]);
  }
};
