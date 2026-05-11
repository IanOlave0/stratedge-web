const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Marca y Derechos */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <span className="text-emerald-400 font-bold text-lg">Stratedge</span> Marketing LLC
          <p className="text-sm mt-1">© {anioActual} Todos los derechos reservados.</p>
        </div>

        {/* Enlaces Legales o de Redes */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-emerald-400 transition-colors">Aviso de Privacidad</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Términos y Condiciones</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;