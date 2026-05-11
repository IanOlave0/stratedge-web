import React from 'react';
import { STRINGS } from '../i18n/strings';

/**
 * Componente ServiciosSection (Placeholder)
 * * Sección de catálogo de servicios — se enriquecerá cuando exista el data model real.
 */
export default function ServiciosSection() {
  const services = [
    {
      title: "Branding & Identidad Visual",
      description: "Creamos marcas que conectan. Desde naming y logo hasta guías de voz y sistemas de diseño completos.",
    },
    {
      title: "Desarrollo Web & Apps",
      description: "Plataformas web y móviles de alto rendimiento con React, Next.js y stacks modernos escalables.",
    },
    {
      title: "Publicidad Digital (Ads)",
      description: "Campañas de alto retorno en Meta, Google, LinkedIn y TikTok con analítica avanzada.",
    },
    {
      title: "E-Commerce & CRO",
      description: "Optimización de tiendas online y embudos de conversión con análisis cuantitativo y UX testing.",
    },
    {
      title: "Gestión de Redes Sociales",
      description: "Estrategia de contenidos, community management y growth hacking para construir comunidades leales.",
    },
    {
      title: "Estrategia & Analítica",
      description: "Consultoría estratégica con dashboards en tiempo real para decisiones basadas en datos.",
    },
  ];

  return (
    <section className="bg-slate-950 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Nuestros <span className="text-emerald-500">Servicios</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Soluciones integrales de marketing digital diseñadas para acelerar el crecimiento de tu negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
