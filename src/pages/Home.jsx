import React from 'react';
import HeroSection from '../components/HeroSection';
import PortafolioGrid from '../components/PortafolioGrid';

/**
 * Página Home (Inicio)
 * * Agrupa los componentes de la vista principal.
 */
const Home = () => {
  return (
    <>
      <HeroSection />
      <PortafolioGrid />
    </>
  );
};

export default Home;