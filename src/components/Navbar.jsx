import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { STRINGS } from '../i18n/strings';

/**
 * Componente Navbar
 * * Barra de navegación superior con logo, enlaces con navegación real y CTA.
 * * Los enlaces "Portafolio" y "Servicios" usan anclas (#) para scroll en la Home.
 * * Reemplaza todos los href="#" por destinos reales.
 */
export default function Navbar() {
  const { nav } = STRINGS;

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Nombre de la Agencia */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-emerald-400">{nav.brandName}</span> {nav.brandSuffix}
        </Link>

        {/* Enlaces de Navegación con destinos reales */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          <li>
            <Link to="/" className="hover:text-emerald-400 transition-colors">
              {nav.links.home}
            </Link>
          </li>
          <li>
            <a href="/#portafolio" className="hover:text-emerald-400 transition-colors">
              {nav.links.portfolio}
            </a>
          </li>
          <li>
            <a href="/#servicios" className="hover:text-emerald-400 transition-colors">
              {nav.links.services}
            </a>
          </li>
        </ul>

        {/* CTA con shadcn Button */}
        <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-full shadow-md">
          <Link to="/cotizar">{nav.cta}</Link>
        </Button>
      </div>
    </nav>
  );
}
