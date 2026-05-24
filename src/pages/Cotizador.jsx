import QuoteForm from '../components/QuoteForm';

const Cotizador = () => {
  return (
    <section className="min-h-[calc(100vh-5rem)] py-12 md:py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm mb-4">
            Sistema de cotizacion
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Cotiza tu proyecto digital
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            La informacion se valida en frontend y backend, y se guarda en la base de datos MySQL.
          </p>
        </div>

        <QuoteForm />
      </div>
    </section>
  );
};

export default Cotizador;
