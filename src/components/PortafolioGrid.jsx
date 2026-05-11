import React from 'react';
import { STRINGS } from '../i18n/strings';

/**
 * Componente PortafolioGrid
 * * Cuadrícula responsiva de proyectos destacados o casos de éxito.
 * * Los datos de proyectos son mock data — en el futuro vendrán del backend.
 * * Usa i18n strings para labels de UI y encabezados de sección.
 */
export default function PortafolioGrid() {
  const { portfolio } = STRINGS;

  // Datos de prueba (Mock data) que simulan la información de una base de datos.
  const projects = [
    {
      id: 1,
      title: "Rebranding y Expansión Digital",
      client: "TechNova Solutions",
      category: "Identidad Visual",
      description: "Rediseño completo de la marca y estrategia de posicionamiento que resultó en un aumento del 40% en la retención de usuarios web.",
      image: "https://placehold.co/600x400/0f172a/34d399?text=Proyecto+1",
    },
    {
      id: 2,
      title: "Campaña de Lanzamiento B2B",
      client: "Logistics Pro",
      category: "Marketing B2B",
      description: "Estrategia integral de captación de leads que generó más de 500 prospectos calificados en el primer trimestre.",
      image: "https://placehold.co/600x400/0f172a/34d399?text=Proyecto+2",
    },
    {
      id: 3,
      title: "Optimización de E-Commerce",
      client: "ModaUrbana",
      category: "CRO & Analítica",
      description: "Auditoría UX/UI y rediseño de embudo de ventas, logrando incrementar la tasa de conversión en un 25%.",
      image: "https://placehold.co/600x400/0f172a/34d399?text=Proyecto+3",
    },
  ];

  return (
    <section className="bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        {/* Encabezado de la Sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {portfolio.heading} <span className="text-emerald-500">{portfolio.headingAccent}</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {portfolio.description}
          </p>
        </div>

        {/* Cuadrícula de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-emerald-900/20 transition-all duration-300 group"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-8">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
