import { useEffect, useState } from 'react';
import { api } from '../utils/api';

const statuses = ['Nuevo lead', 'Contactado', 'En cotizacion', 'Cliente activo', 'Cerrado'];
const emptyProject = { title: '', client: '', category: '', description: '', image: '' };

const Admin = () => {
  const [logged, setLogged] = useState(api.hasToken());
  const [login, setLogin] = useState({ username: 'admin', password: '' });
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(emptyProject);
  const [query, setQuery] = useState('SELECT * FROM leads ORDER BY id DESC');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const loadAdminData = async () => {
    const [leadRows, projectRows] = await Promise.all([api.getLeads(), api.getPortfolio()]);
    setLeads(leadRows);
    setProjects(projectRows);
  };

  useEffect(() => {
    if (logged) {
      Promise.resolve()
        .then(loadAdminData)
        .catch(() => setLogged(false));
    }
  }, [logged]);

  const submitLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await api.login(login);
      setLogged(true);
    } catch {
      setError('Usuario o contrasena incorrectos.');
    }
  };

  const changeStatus = async (id, status) => {
    await api.updateLeadStatus(id, status);
    await loadAdminData();
  };

  const saveProject = async (event) => {
    event.preventDefault();
    await api.createProject(project);
    setProject(emptyProject);
    await loadAdminData();
  };

  const runSelect = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const result = await api.runSelect(query);
      setRows(result.rows);
    } catch (err) {
      setError(err.error || 'Consulta no permitida.');
    }
  };

  if (!logged) {
    return (
      <section className="min-h-[calc(100vh-5rem)] bg-slate-950 py-20">
        <form onSubmit={submitLogin} className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-lg p-8">
          <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm mb-4">Administrador</p>
          <h1 className="text-3xl font-extrabold text-white mb-6">Acceso privado</h1>
          {error && <p className="text-red-300 mb-4">{error}</p>}
          <input value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} className="w-full mb-4 rounded-lg bg-slate-950 border border-slate-700 text-white px-4 py-3" />
          <input type="password" placeholder="Contrasena" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} className="w-full rounded-lg bg-slate-950 border border-slate-700 text-white px-4 py-3" />
          <button className="mt-6 w-full bg-emerald-600 text-white font-bold rounded-full py-3">Entrar</button>
          <p className="text-slate-500 text-sm mt-4">Usuario demo: admin | Contrasena: Admin123!</p>
        </form>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 py-10 min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto px-6 space-y-8">
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm">Panel privado</p>
            <h1 className="text-4xl font-extrabold text-white mt-2">Base de datos y administracion</h1>
          </div>
          <button onClick={() => { api.logout(); setLogged(false); }} className="bg-slate-800 text-white px-5 py-3 rounded-full">Salir</button>
        </div>

        <section className="bg-slate-900 border border-slate-800 rounded-lg overflow-auto">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white">Leads guardados</h2>
          </div>
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-slate-950 text-slate-300">
              <tr><th className="p-4">Cliente</th><th>Servicio</th><th>Estimado</th><th>Fecha</th><th>Estatus</th></tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-800">
                  <td className="p-4"><p className="text-white font-semibold">{lead.fullName}</p><p className="text-slate-500 text-sm">{lead.email} | {lead.phone}</p></td>
                  <td className="text-slate-300">{lead.serviceName}</td>
                  <td className="text-slate-300">${lead.estimatedTotal.toLocaleString('en-US')}</td>
                  <td className="text-slate-300">{lead.createdAt}</td>
                  <td><select value={lead.status} onChange={(e) => changeStatus(lead.id, e.target.value)} className="bg-slate-950 text-white border border-slate-700 rounded-lg px-3 py-2">{statuses.map((s) => <option key={s}>{s}</option>)}</select></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={saveProject} className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">Agregar proyecto al portafolio</h2>
            {Object.keys(emptyProject).map((key) => (
              <input key={key} required value={project[key]} placeholder={key} onChange={(e) => setProject({ ...project, [key]: e.target.value })} className="w-full rounded-lg bg-slate-950 border border-slate-700 text-white px-4 py-3" />
            ))}
            <button className="bg-emerald-600 text-white font-bold rounded-full px-6 py-3">Guardar proyecto</button>
          </form>

          <form onSubmit={runSelect} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white">Ejecutar SELECT</h2>
            <p className="text-slate-400 mt-2 mb-4">Por seguridad solo se permiten consultas SELECT.</p>
            {error && <p className="text-red-300 mb-4">{error}</p>}
            <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows="5" className="w-full rounded-lg bg-slate-950 border border-slate-700 text-white px-4 py-3 font-mono" />
            <button className="mt-4 bg-emerald-600 text-white font-bold rounded-full px-6 py-3">Ejecutar consulta</button>
            <pre className="mt-4 bg-slate-950 text-slate-300 rounded-lg p-4 overflow-auto text-xs">{JSON.stringify(rows, null, 2)}</pre>
          </form>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Proyectos actuales</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((item) => (
              <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                <p className="text-white font-bold">{item.title}</p>
                <p className="text-slate-500 text-sm">{item.category}</p>
                <button onClick={() => api.deleteProject(item.id).then(loadAdminData)} className="text-red-300 text-sm font-semibold mt-3">Borrar</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Admin;
