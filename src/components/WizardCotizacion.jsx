import React, { useState } from 'react';

/**
 * Componente WizardCotizacion
 * * Maneja la lógica de pasos (step-by-step) para el proceso de cotización.
 * Utiliza el hook useState para rastrear el progreso del usuario.
 */
const WizardCotizacion = () => {
  // Estado para recordar en qué paso estamos (iniciamos en el paso 1)
  const [pasoActual, setPasoActual] = useState(1);
  const totalPasos = 3;

  // Funciones de navegación entre pasos
  const irSiguientePaso = () => {
    if (pasoActual < totalPasos) setPasoActual(pasoActual + 1);
  };

  const irPasoAnterior = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1);
  };

  return (
    /**
     * Contenedor principal tipo "Tarjeta" (Card)
     * Le damos un fondo oscuro, bordes sutiles y sombra para que resalte.
     */
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-3xl mx-auto overflow-hidden">
      
      {/* --- CABECERA: Indicador de Progreso --- */}
      <div className="bg-slate-800/50 px-8 py-6 border-b border-slate-700">
        <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-2">
          Paso {pasoActual} de {totalPasos}
        </p>
        {/* Barra de progreso visual */}
        <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(pasoActual / totalPasos) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* --- CUERPO: Contenido Dinámico según el Paso --- */}
      <div className="p-8 min-h-[300px]">
        {pasoActual === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4">¿Qué necesitas?</h2>
            <p className="text-slate-400">Aquí pondremos las opciones de servicios (Branding, Web, Ads...).</p>
          </div>
        )}
        
        {pasoActual === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4">Detalles del Proyecto</h2>
            <p className="text-slate-400">Aquí pediremos el presupuesto estimado y el tiempo de entrega.</p>
          </div>
        )}

        {pasoActual === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4">Tus Datos</h2>
            <p className="text-slate-400">Aquí pediremos el nombre y correo para enviar la cotización.</p>
          </div>
        )}
      </div>

      {/* --- PIE: Botones de Navegación --- */}
      <div className="px-8 py-6 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
        
        <button
          onClick={irPasoAnterior}
          disabled={pasoActual === 1} // Se desactiva si estamos en el paso 1
          className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
            pasoActual === 1 
              ? 'text-slate-600 cursor-not-allowed' 
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          ← Anterior
        </button>

        <button
          onClick={irSiguientePaso}
          className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-500 transition-all duration-300 hover:-translate-y-1"
        >
          {pasoActual === totalPasos ? 'Enviar Cotización' : 'Siguiente →'}
        </button>

      </div>

    </div>
  );
};

export default WizardCotizacion;