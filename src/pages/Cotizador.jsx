import React from 'react';
import WizardCotizacion from '../components/WizardCotizacion';
import { STRINGS } from '../i18n/strings';

/**
 * Página Cotizador
 * * Contiene el layout de la pantalla y renderiza el Wizard interactivo.
 * * Usa i18n strings para el encabezado.
 */
export default function Cotizador() {
  const { cotizador } = STRINGS;

  return (
    <section className="min-h-[calc(100vh-5rem)] py-12 md:py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        {/* Encabezado de la página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {cotizador.heading} <span className="text-emerald-500">{cotizador.headingAccent}</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {cotizador.description}
          </p>
        </div>

        <WizardCotizacion />
      </div>
    </section>
  );
}
