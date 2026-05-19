import { useEffect, useState } from 'react';
import { api } from '../utils/api';

const PortafolioGrid = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.getPortfolio().then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <section id="portfolio" className="bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm mb-4">Portafolio</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Trabajos que muestran confianza antes de la primera llamada.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Los proyectos se cargan desde la base de datos e incluyen categoria, imagen, cliente y descripcion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article key={project.id} className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-lg group">
              <div className="overflow-hidden aspect-[4/3] bg-slate-800">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <span className="text-slate-500 text-sm mb-4 block">Cliente: {project.client}</span>
                <p className="text-slate-400 leading-relaxed text-sm">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortafolioGrid;
