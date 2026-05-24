import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { STRINGS } from '../i18n/strings';
import { api } from '../utils/api';

/**
 * Componente PortafolioGrid
 * Muestra proyectos reales consultados desde la API y almacenados en MySQL.
 */
export default function PortafolioGrid() {
  const { portfolio } = STRINGS;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.getPortfolio().then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <section className="bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {portfolio.heading} <span className="text-emerald-500">{portfolio.headingAccent}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {portfolio.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-slate-950 border-slate-800 overflow-hidden shadow-lg hover:shadow-emerald-900/20 transition-all duration-300 group"
            >
              <div className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </CardHeader>
              </div>

              <CardContent className="p-8">
                <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                <span className="text-slate-500 text-sm mb-4 block">
                  {portfolio.clientLabel} {project.client}
                </span>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
