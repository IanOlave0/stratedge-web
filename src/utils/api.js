const API_URL = 'http://localhost:4000/api';
const TOKEN_KEY = 'stratedge_admin_token';

// Funcion central para comunicarse con el backend. Agrega JSON, token de
// administrador cuando existe y normaliza el manejo de errores.
const request = async (path, options = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

// Cliente de API usado por los componentes de React. Centralizar estas
// llamadas evita repetir fetch y mantiene las rutas en un solo archivo.
export const api = {
  getServices: () => request('/services'),
  getPortfolio: () => request('/portfolio'),
  createLead: (lead) => request('/leads', { method: 'POST', body: JSON.stringify(lead) }),
  login: async (credentials) => {
    // Si el login es correcto, se guarda el token para rutas privadas.
    const data = await request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },
  logout: () => {
    // Se borra el token local aunque el backend no responda al cierre.
    localStorage.removeItem(TOKEN_KEY);
    return request('/auth/logout', { method: 'POST' }).catch(() => ({ ok: true }));
  },
  getLeads: () => request('/leads'),
  updateLeadStatus: (id, status) => request(`/leads/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  createProject: (project) => request('/portfolio', { method: 'POST', body: JSON.stringify(project) }),
  deleteProject: (id) => request(`/portfolio/${id}`, { method: 'DELETE' }),
  hasToken: () => Boolean(localStorage.getItem(TOKEN_KEY)),
};
