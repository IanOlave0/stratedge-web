import { Link } from 'react-router-dom';
import { STRINGS } from '../i18n/strings';

/**
 * Componente Navbar
 * * Barra de navegación superior con logo, enlaces y CTA.
 * * Usa i18n strings para todo el texto visible.
 */
export default function Navbar() {
  const { nav } = STRINGS;

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Nombre de la Agencia */}
        <div className="text-2xl font-extrabold tracking-tight">
          <span className="text-emerald-400">{nav.brandName}</span> {nav.brandSuffix}
        </div>

        {/* Enlaces de Navegación */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          <li><a href="#" className="hover:text-emerald-400 transition-colors">{nav.links.home}</a></li>
          <li><a href="#" className="hover:text-emerald-400 transition-colors">{nav.links.portfolio}</a></li>
          <li><a href="#" className="hover:text-emerald-400 transition-colors">{nav.links.services}</a></li>
        </ul>

        {/* CTA */}
        <Link
          to="/cotizar"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md inline-block"
        >
          {nav.cta}
        </Link>
      </div>
    </nav>
  );
}
