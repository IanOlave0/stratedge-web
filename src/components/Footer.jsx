import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="text-emerald-400 font-bold text-lg">Stratedge</span> Marketing LLC
          <p className="text-sm mt-1">San Jose, California | Colima, Mexico</p>
          <p className="text-sm mt-1">© {currentYear} Todos los derechos reservados.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 text-sm">
          <Link to="/cotizar" className="hover:text-emerald-400 transition-colors">Cotizar</Link>
          <Link to="/admin" className="hover:text-emerald-400 transition-colors">Administrador</Link>
          <a href="mailto:contact@stratedgemarketing.com" className="hover:text-emerald-400 transition-colors">Correo</a>
          <a href="https://instagram.com" className="hover:text-emerald-400 transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
