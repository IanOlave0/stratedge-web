import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-tight">
          <span className="text-emerald-400">Agencia</span> Digital MX
        </Link>

        <ul className="hidden lg:flex space-x-8 text-sm font-medium text-slate-300">
          <li><Link to="/" className="hover:text-emerald-400 transition-colors">Inicio</Link></li>
          <li><a href="/#services" className="hover:text-emerald-400 transition-colors">Servicios</a></li>
          <li><a href="/#portfolio" className="hover:text-emerald-400 transition-colors">Portafolio</a></li>
        </ul>

        <Link
          to="/cotizar"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2 px-4 md:px-6 rounded-full transition-transform transform hover:scale-105 shadow-md inline-block text-sm md:text-base"
        >
          Cotizar
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
