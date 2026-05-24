import React from 'react';
import HeroSection from '../components/HeroSection';
import PortafolioGrid from '../components/PortafolioGrid';
import ServicesSection from '../components/ServicesSection';

/**
 * Página Home (Inicio)
 * * Agrupa los componentes de la vista principal con anclas para navegación.
 */
export default function Home() {
  return (
    <>
      <div id="inicio">
        <HeroSection />
      </div>
      <div id="portafolio">
        <PortafolioGrid />
      </div>
      <div id="servicios">
        <ServicesSection />
      </div>
    </>
  );
}
