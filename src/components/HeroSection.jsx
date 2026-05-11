import React from 'react';
import { STRINGS } from '../i18n/strings';

/**
 * Componente HeroSection
 * * Sección principal full-viewport con titulares, descripción y CTAs.
 * * Usa i18n strings para todo el texto visible.
 */
export default function HeroSection() {
  const { hero } = STRINGS;

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center bg-slate-950 overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center flex flex-col items-center relative z-10">
        {/* Antetítulo */}
        <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm mb-6 animate-fade-in">
          {hero.tagline}
        </p>

        {/* Titular Principal */}
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[1.1] max-w-6xl">
          <span className="block text-white">{hero.headlineLine1}</span>
          <span className="block bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            {hero.headlineLine2}
          </span>
        </h1>

        {/* Descripción */}
        <p className="mt-10 text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-light">
          {hero.description}
        </p>

        {/* CTAs */}
        <div className="mt-14 flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
          <a
            href="#"
            className="w-full sm:w-auto px-12 py-5 bg-emerald-600 text-white font-bold rounded-full text-lg shadow-xl hover:bg-emerald-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-emerald-900/40"
          >
            {hero.ctaPrimary}
          </a>

          <a
            href="#"
            className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-slate-100 font-semibold rounded-full text-lg border border-slate-800 hover:bg-slate-800 transition-all duration-300 group"
          >
            {hero.ctaSecondary}
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Indicador visual de scroll */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-1 h-10 rounded-full bg-gradient-to-b from-emerald-500 to-transparent opacity-50"></div>
        </div>
      </div>
    </section>
  );
}
