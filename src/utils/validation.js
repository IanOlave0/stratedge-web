const today = new Date().toISOString().split('T')[0];

// Expresiones regulares que limitan caracteres permitidos en el formulario.
// Ayudan a prevenir datos invalidos y entradas con simbolos peligrosos.
const patterns = {
  fullName: /^[A-Za-zÀ-ÿÑñ' -]{3,80}$/,
  email: /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/,
  phone: /^\d{10}$/,
  zipCode: /^\d{5}$/,
  company: /^[A-Za-z0-9À-ÿÑñ .,&'()-]{0,80}$/,
  campaignStart: /^\d{4}-\d{2}-\d{2}$/,
  socialLinks: /^[A-Za-z0-9À-ÿÑñ:/.?&=_#@%+\-\s]{0,250}$/,
  message: /^[A-Za-z0-9À-ÿÑñ .,;:!?¿¡'"()@%+\-/$\n\r]{0,500}$/,
};

// Reglas usadas por el formulario antes de enviar datos al backend.
export const validationRules = {
  fullName: {
    help: 'Permitido: letras, espacios, apostrofe y guion.',
    error: 'Usa de 3 a 80 letras. No se permiten numeros ni otros simbolos.',
    validate: (value) => patterns.fullName.test(value.trim()),
  },
  email: {
    help: 'Usa formato de correo real. Ejemplo: nombre@correo.com',
    error: 'Escribe un correo valido.',
    validate: (value) => patterns.email.test(value.trim()),
  },
  phone: {
    help: 'Permitido: solo numeros, exactamente 10 digitos.',
    error: 'El telefono debe tener exactamente 10 digitos.',
    validate: (value) => patterns.phone.test(value),
  },
  zipCode: {
    help: 'Permitido: solo numeros, 5 digitos.',
    error: 'El codigo postal debe tener 5 digitos.',
    validate: (value) => value === '' || patterns.zipCode.test(value),
  },
  company: {
    help: "Permitido: letras, numeros, espacios, . , & ' ( ) y guion.",
    error: 'La empresa contiene caracteres no permitidos.',
    validate: (value) => patterns.company.test(value.trim()),
  },
  campaignStart: {
    help: 'La fecha de inicio no puede estar en el pasado.',
    error: 'Elige hoy o una fecha futura.',
    validate: (value) => value === '' || (patterns.campaignStart.test(value) && value >= today),
  },
  socialLinks: {
    help: 'Permitido: caracteres normales de URL. No uses <, > ni codigo.',
    error: 'Los links contienen caracteres no permitidos.',
    validate: (value) => patterns.socialLinks.test(value.trim()),
  },
  message: {
    help: 'Permitido: texto normal y puntuacion basica. No uses simbolos de codigo.',
    error: 'Las notas contienen caracteres no permitidos.',
    validate: (value) => patterns.message.test(value.trim()),
  },
};

// Limpia el valor mientras el usuario escribe para evitar caracteres no validos.
export const sanitizeContactField = (name, value) => {
  if (name === 'phone') return value.replace(/\D/g, '').slice(0, 10);
  if (name === 'zipCode') return value.replace(/\D/g, '').slice(0, 5);
  if (name === 'fullName') return value.replace(/[^A-Za-zÀ-ÿÑñ' -]/g, '').slice(0, 80);
  if (name === 'company') return value.replace(/[^A-Za-z0-9À-ÿÑñ .,&'()-]/g, '').slice(0, 80);
  if (name === 'socialLinks') return value.replace(/[^A-Za-z0-9À-ÿÑñ:/.?&=_#@%+\-\s]/g, '').slice(0, 250);
  if (name === 'message') return value.replace(/[^A-Za-z0-9À-ÿÑñ .,;:!?¿¡'"()@%+\-/$\n\r]/g, '').slice(0, 500);
  return value;
};

// Devuelve un objeto de errores por campo; si esta vacio, el formulario es valido.
export const validateContact = (contact) =>
  Object.entries(validationRules).reduce((errors, [field, rule]) => {
    if (!rule.validate(contact[field] || '')) {
      return { ...errors, [field]: rule.error };
    }
    return errors;
  }, {});

export const getTodayDate = () => today;
