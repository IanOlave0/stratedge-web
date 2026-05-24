import { useEffect, useState } from 'react';
import { api } from '../utils/api';

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => setServices([]));
  }, []);

  return (
    <section id="services" className="bg-slate-950 py-20 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm mb-4">Servicios</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Soluciones digitales y creativas para negocios locales.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <article key={service.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">{service.category}</span>
              <h3 className="text-2xl font-bold text-white mt-3">{service.name}</h3>
              <p className="text-slate-400 mt-4 leading-relaxed">{service.description}</p>
              <p className="text-slate-300 font-semibold mt-6">Desde ${service.basePrice.toLocaleString('en-US')} USD</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
