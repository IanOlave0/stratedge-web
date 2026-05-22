import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { getTodayDate, sanitizeContactField, validateContact } from '../utils/validation';

const initialContact = {
  fullName: '',
  email: '',
  phone: '',
  zipCode: '',
  company: '',
  campaignStart: '',
  socialLinks: '',
  message: '',
};

const QuoteForm = () => {
  // Estados principales del cotizador: datos del cliente, servicios,
  // errores de validacion y resultado devuelto por la API.
  const [contact, setContact] = useState(initialContact);
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');

  // Al cargar el componente se consultan los servicios reales desde MySQL
  // por medio del backend.
  useEffect(() => {
    api.getServices()
      .then((rows) => {
        setServices(rows);
        setServiceId(rows[0]?.id || '');
      })
      .catch(() => setApiError('No se pudo conectar con el servidor. Ejecuta npm.cmd run api.'));
  }, []);

  const service = services.find((item) => item.id === serviceId);

  // Actualiza campos del formulario aplicando sanitizacion inmediata.
  const changeContact = (event) => {
    const { name, value } = event.target;
    setContact((current) => ({ ...current, [name]: sanitizeContactField(name, value) }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  // Valida el formulario y envia la solicitud al backend para guardarla.
  const submitLead = async (event) => {
    event.preventDefault();
    setApiError('');
    const nextErrors = validateContact({ ...contact, serviceId });
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      const saved = await api.createLead({ ...contact, serviceId });
      setResult(saved);
      setContact(initialContact);
    } catch (error) {
      setErrors(error.errors || {});
      setApiError(error.error || 'No se pudo guardar el lead.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-2xl max-w-5xl mx-auto overflow-hidden">
      <div className="bg-slate-800/50 px-6 md:px-8 py-6 border-b border-slate-700">
        <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">Cotizador validado</p>
        <h2 className="text-white font-extrabold text-3xl mt-2">
          {service ? `$${service.basePrice.toLocaleString('en-US')} USD estimado base` : 'Cargando servicios...'}
        </h2>
      </div>

      <form onSubmit={submitLead} className="p-6 md:p-8">
        {apiError && <p className="mb-6 text-red-300 font-semibold">{apiError}</p>}
        <label className="block">
          <span className="text-sm font-semibold text-slate-300">Servicio</span>
          <select value={serviceId} onChange={(event) => setServiceId(event.target.value)} className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-emerald-500">
            {services.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <ContactInput name="fullName" label="Nombre completo" value={contact.fullName} onChange={changeContact} error={errors.fullName} required />
          <ContactInput name="email" label="Correo electronico" type="email" value={contact.email} onChange={changeContact} error={errors.email} required />
          <ContactInput name="phone" label="Telefono" type="tel" value={contact.phone} onChange={changeContact} error={errors.phone} required numeric maxLength={10} pattern="\d{10}" />
          <ContactInput name="zipCode" label="Codigo postal" value={contact.zipCode} onChange={changeContact} error={errors.zipCode} numeric maxLength={5} pattern="\d{5}" />
          <ContactInput name="company" label="Empresa" value={contact.company} onChange={changeContact} error={errors.company} />
          <ContactInput name="campaignStart" label="Fecha de inicio de campana" type="date" value={contact.campaignStart} onChange={changeContact} error={errors.campaignStart} min={getTodayDate()} />
        </div>

        <ContactInput name="socialLinks" label="Redes sociales actuales" value={contact.socialLinks} onChange={changeContact} error={errors.socialLinks} maxLength={250} />

        <label className="block mt-4">
          <span className="text-sm font-semibold text-slate-300">Notas del proyecto</span>
          <textarea name="message" rows="4" value={contact.message} onChange={changeContact} maxLength="500" className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-emerald-500" />
          {errors.message && <p className="text-red-300 text-sm mt-2">{errors.message}</p>}
        </label>

        <button className="mt-8 px-8 py-3 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-500 transition-all disabled:bg-slate-700" disabled={!serviceId}>
          Guardar solicitud validada
        </button>

        {result && (
          <div className="mt-8 rounded-lg border border-emerald-700 bg-emerald-950/30 p-5">
            <p className="text-emerald-300 font-semibold">
              Cotizacion guardada. Estimado aproximado: ${result.estimatedTotal.toLocaleString('en-US')} USD.
            </p>
            <p className="mt-2 text-slate-300 text-sm">La solicitud quedo registrada para seguimiento.</p>
          </div>
        )}
      </form>
    </div>
  );
};

const ContactInput = ({ name, label, value, onChange, error, type = 'text', required = false, numeric = false, maxLength, pattern, min }) => (
  <label className="block mt-4 md:mt-0">
    <span className="text-sm font-semibold text-slate-300">{label}</span>
    <input name={name} type={type} required={required} value={value} onChange={onChange} inputMode={numeric ? 'numeric' : undefined} maxLength={maxLength} pattern={pattern} min={min} className="mt-2 w-full rounded-lg bg-slate-950 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-emerald-500" />
    {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
  </label>
);

export default QuoteForm;
