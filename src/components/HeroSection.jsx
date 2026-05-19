import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(16,185,129,0.18)_1px,transparent_1px),linear-gradient(0deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center py-16">
        <div>
          <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm mb-6">
            Marketing digital para negocios en California
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-5xl text-white">
            Estrategia, creatividad y campanas para atraer nuevos clientes.
          </h1>

          <p className="mt-8 text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
            Stratedge Marketing ayuda a pequenas empresas, emprendedores y marcas locales a mejorar su presencia digital con sitios web, publicidad, redes sociales, branding y contenido visual.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/cotizar"
              className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-full text-center shadow-xl hover:bg-emerald-500 transition-all duration-300"
            >
              Cotizar proyecto
            </Link>

            <a
              href="#portfolio"
              className="px-8 py-4 bg-slate-900 text-slate-100 font-semibold rounded-full text-center border border-slate-700 hover:bg-slate-800 transition-all duration-300"
            >
              Ver portafolio
            </a>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-6 shadow-2xl">
          <div className="grid grid-cols-2 gap-4">
            {[
              ['San Jose, CA', 'Mercado principal'],
              ['Colima, MX', 'Soporte creativo'],
              ['Bilingue', 'Espanol / ingles'],
              ['Cotizacion', 'Respuesta rapida'],
            ].map(([value, label]) => (
              <div key={value} className="bg-slate-950 border border-slate-800 rounded-lg p-5">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="text-sm text-slate-400 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
