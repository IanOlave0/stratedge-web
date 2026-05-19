const patterns = {
  fullName: /^[A-Za-zÀ-ÿÑñ' -]{3,80}$/,
  email: /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/,
  phone: /^\d{10}$/,
  zipCode: /^\d{5}$/,
  company: /^[A-Za-z0-9À-ÿÑñ .,&'()-]{0,80}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  socialLinks: /^[A-Za-z0-9À-ÿÑñ:/.?&=_#@%+\-\s]{0,250}$/,
  message: /^[A-Za-z0-9À-ÿÑñ .,;:!?¿¡'"()@%+\-/$\n\r]{0,500}$/,
  text: /^[A-Za-z0-9À-ÿÑñ .,;:!?¿¡'"()@%+\-/$\n\r]{2,500}$/,
  imageUrl: /^https?:\/\/[^\s<>]{5,500}$/,
};

const today = () => new Date().toISOString().split('T')[0];
const clean = (value = '') => String(value).trim();

export const validateLead = (body) => {
  const value = {
    fullName: clean(body.fullName),
    email: clean(body.email).toLowerCase(),
    phone: clean(body.phone).replace(/\D/g, ''),
    zipCode: clean(body.zipCode).replace(/\D/g, ''),
    company: clean(body.company),
    campaignStart: clean(body.campaignStart),
    socialLinks: clean(body.socialLinks),
    message: clean(body.message),
    serviceId: clean(body.serviceId),
  };
  const errors = {};
  if (!patterns.fullName.test(value.fullName)) errors.fullName = 'Nombre invalido.';
  if (!patterns.email.test(value.email)) errors.email = 'Correo invalido.';
  if (!patterns.phone.test(value.phone)) errors.phone = 'El telefono debe tener 10 digitos.';
  if (value.zipCode && !patterns.zipCode.test(value.zipCode)) errors.zipCode = 'El ZIP debe tener 5 digitos.';
  if (!patterns.company.test(value.company)) errors.company = 'Empresa invalida.';
  if (value.campaignStart && (!patterns.date.test(value.campaignStart) || value.campaignStart < today())) errors.campaignStart = 'Fecha invalida.';
  if (!patterns.socialLinks.test(value.socialLinks)) errors.socialLinks = 'Links invalidos.';
  if (!patterns.message.test(value.message)) errors.message = 'Notas invalidas.';
  if (!value.serviceId) errors.serviceId = 'Selecciona un servicio.';
  return { value, errors };
};

export const validateProject = (body) => {
  const value = {
    title: clean(body.title),
    client: clean(body.client),
    category: clean(body.category),
    description: clean(body.description),
    image: clean(body.image),
  };
  const errors = {};
  if (!patterns.text.test(value.title) || value.title.length > 120) errors.title = 'Titulo invalido.';
  if (!patterns.text.test(value.client) || value.client.length > 120) errors.client = 'Cliente invalido.';
  if (!patterns.text.test(value.category) || value.category.length > 80) errors.category = 'Categoria invalida.';
  if (!patterns.text.test(value.description)) errors.description = 'Descripcion invalida.';
  if (!patterns.imageUrl.test(value.image)) errors.image = 'URL de imagen invalida.';
  return { value, errors };
};

export const isSafeSelect = (query) => {
  const normalized = String(query || '').trim().replace(/\s+/g, ' ').toLowerCase();
  return normalized.startsWith('select ')
    && !/;\s*\S/.test(normalized)
    && !/\b(insert|update|delete|drop|alter|create|replace|pragma|attach|detach)\b/.test(normalized);
};
