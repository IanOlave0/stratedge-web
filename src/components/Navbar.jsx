import { Link } from 'react-router-dom'; // Importamos Link para navegación interna sin recargar la página

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      {/* Contenedor central para que no se pegue a los bordes en pantallas grandes */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Nombre de la Agencia */}
        <div className="text-2xl font-extrabold tracking-tight">
          <span className="text-emerald-400">Stratedge</span> Marketing
        </div>

        {/* Enlaces de Navegación (Ocultos en celular, visibles en PC) */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          <li><a href="#" className="hover:text-emerald-400 transition-colors">Inicio</a></li>
          <li><a href="#" className="hover:text-emerald-400 transition-colors">Portafolio</a></li>
          <li><a href="#" className="hover:text-emerald-400 transition-colors">Servicios</a></li>
        </ul>

        {/* Link de Llamada a la Acción */}
        <Link 
        to="/cotizar" 
        className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md inline-block"
        >
        Cotizar Proyecto
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;