import React from 'react';
import WizardCotizacion from '../components/WizardCotizacion'; // Importamos el cerebro

/**
 * Página Cotizador
 * * Contiene el layout de la pantalla y renderiza el Wizard interactivo.
 */
const Cotizador = () => {
  return (
    <section className="min-h-[calc(100vh-5rem)] py-12 md:py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        
        {/* Encabezado de la página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Cotiza tu <span className="text-emerald-500">Proyecto</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Cuéntanos sobre tu visión. Completa estos sencillos pasos y obtén un estimado al instante.
          </p>
        </div>

        {/* Aquí inyectamos el componente interactivo */}
        <WizardCotizacion />

      </div>
    </section>
  );
};

export default Cotizador;