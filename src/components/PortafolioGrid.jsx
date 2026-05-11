import React from 'react';

/**
 * Componente PortafolioGrid
 * * Muestra una cuadrícula responsiva de proyectos destacados o casos de éxito.
 * Implementa CSS Grid y el método .map() de JavaScript para renderizar 
 * dinámicamente las tarjetas a partir de un arreglo de datos.
 */
const PortafolioGrid = () => {
  
  // Datos de prueba (Mock data) que simulan la información de una base de datos.
  const proyectos = [
    {
      id: 1,
      titulo: "Rebranding y Expansión Digital",
      cliente: "TechNova Solutions",
      categoria: "Identidad Visual",
      descripcion: "Rediseño completo de la marca y estrategia de posicionamiento que resultó en un aumento del 40% en la retención de usuarios web.",
      // Usamos un servicio de imágenes de relleno (placeholder) con nuestros colores
      imagen: "https://placehold.co/600x400/0f172a/34d399?text=Proyecto+1"
    },
    {
      id: 2,
      titulo: "Campaña de Lanzamiento B2B",
      cliente: "Logistics Pro",
      categoria: "Marketing B2B",
      descripcion: "Estrategia integral de captación de leads que generó más de 500 prospectos calificados en el primer trimestre.",
      imagen: "https://placehold.co/600x400/0f172a/34d399?text=Proyecto+2"
    },
    {
      id: 3,
      titulo: "Optimización de E-Commerce",
      cliente: "ModaUrbana",
      categoria: "CRO & Analítica",
      descripcion: "Auditoría UX/UI y rediseño de embudo de ventas, logrando incrementar la tasa de conversión en un 25%.",
      imagen: "https://placehold.co/600x400/0f172a/34d399?text=Proyecto+3"
    }
  ];

  return (
    /**
     * Contenedor de la sección.
     * Usamos bg-slate-900 (un poco más claro que el 950 del Hero) para crear
     * una separación visual sutil pero elegante entre las secciones.
     */
    <section className="bg-slate-900 py-20">
      <div className="container mx-auto px-6">
        
        {/* Encabezado de la Sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Nuestros <span className="text-emerald-500">Casos de Éxito</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explora cómo hemos ayudado a empresas líderes a transformar su presencia digital y dominar sus respectivos mercados.
          </p>
        </div>

        {/* Cuadrícula (Grid) de Tarjetas
          - grid-cols-1: 1 columna en celulares.
          - md:grid-cols-2: 2 columnas en tablets.
          - lg:grid-cols-3: 3 columnas en pantallas grandes.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Iteramos sobre nuestro arreglo de proyectos para crear una tarjeta por cada uno */}
          {proyectos.map((proyecto) => (
            <div 
              key={proyecto.id} 
              className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-lg hover:shadow-emerald-900/20 transition-all duration-300 group"
            >
              {/* Contenedor de la Imagen con efecto zoom al pasar el mouse */}
              <div className="overflow-hidden">
                <img 
                  src={proyecto.imagen} 
                  alt={proyecto.titulo} 
                  className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Contenido de la Tarjeta */}
              <div className="p-8">
                <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase mb-2 block">
                  {proyecto.categoria}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {proyecto.titulo}
                </h3>
                <span className="text-slate-500 text-sm mb-4 block">
                  Cliente: {proyecto.cliente}
                </span>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {proyecto.descripcion}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default PortafolioGrid;