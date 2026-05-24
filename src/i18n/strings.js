// Textos visibles centralizados. Mantenerlos aqui facilita traducir o ajustar
// la interfaz sin buscar cadenas sueltas por todos los componentes.
export const STRINGS = {
  nav: {
    brandName: 'Agencia',
    brandSuffix: 'Digital MX',
    links: {
      home: 'Inicio',
      portfolio: 'Portafolio',
      services: 'Servicios',
    },
    cta: 'Cotizar',
  },

  hero: {
    tagline: 'Mercadotecnia digital para negocios en California',
    headlineLine1: 'Estrategia y creatividad.',
    headlineLine2: 'Campanas para atraer clientes.',
    description:
      'Agencia Digital MX ayuda a pequenas empresas, emprendedores y marcas locales a mejorar su presencia digital con sitios web, publicidad, redes sociales, identidad de marca y contenido visual.',
    ctaPrimary: 'Cotizar proyecto',
    ctaSecondary: 'Ver servicios',
  },

  footer: {
    brandName: 'Agencia',
    brandSuffix: 'Digital MX',
    copyright: (year) => `(c) ${year} Todos los derechos reservados.`,
    links: {
      privacy: 'Aviso de privacidad',
      terms: 'Terminos y condiciones',
      instagram: 'Instagram',
    },
  },

  portfolio: {
    heading: 'Nuestro',
    headingAccent: 'Portafolio',
    description:
      'Los proyectos se cargan desde la base de datos e incluyen categoria, imagen, cliente y descripcion.',
    clientLabel: 'Cliente:',
  },

  cotizador: {
    heading: 'Cotiza tu',
    headingAccent: 'Proyecto',
    description:
      'Completa tus datos para guardar una solicitud validada en la base de datos.',
  },

  wizard: {
    stepLabel: (current, total) => `Paso ${current} de ${total}`,
    back: '< Anterior',
    next: 'Siguiente >',
    submit: 'Enviar cotizacion',
    submitting: 'Enviando...',
    steps: {
      1: 'Servicios',
      2: 'Presupuesto',
      3: 'Contacto',
    },
    step1: {
      heading: 'Que necesitas?',
      serviceLabel: 'Selecciona los servicios que te interesan',
      serviceHint: 'Puedes elegir mas de uno',
      scopeLabel: 'Cuentanos brevemente sobre tu proyecto',
      scopePlaceholder:
        'Ej: Quiero redisenar mi sitio web y lanzar campanas para aumentar ventas.',
    },
    step2: {
      heading: 'Presupuesto y plazos',
      budgetLabel: 'Cual es tu presupuesto estimado?',
      budgetPlaceholder: 'Selecciona un rango',
      timelineLabel: 'Para cuando lo necesitas?',
      timelinePlaceholder: 'Selecciona la urgencia',
      notesLabel: 'Notas adicionales (opcional)',
      notesPlaceholder: 'Cualquier detalle adicional que quieras compartir.',
    },
    step3: {
      heading: 'Tus datos',
      description:
        'Dejanos tus datos y te contactaremos para dar seguimiento a la cotizacion.',
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Ej: Ana Garcia',
      email: 'Correo electronico',
      emailPlaceholder: 'ana@empresa.com',
      company: 'Empresa',
      companyPlaceholder: 'Nombre de tu empresa',
      phone: 'Telefono (opcional)',
      phonePlaceholder: '5551234567',
    },
    errors: {
      servicesRequired: 'Selecciona al menos un servicio',
      scopeMin: 'Describe tu proyecto con al menos 10 caracteres',
      budgetRequired: 'Selecciona un rango de presupuesto',
      timelineRequired: 'Selecciona la urgencia del proyecto',
      fullNameMin: 'El nombre debe tener al menos 2 caracteres',
      emailInvalid: 'Ingresa un correo electronico valido',
      companyMin: 'Ingresa el nombre de tu empresa',
    },
    success: 'Cotizacion enviada. Te contactaremos pronto.',
    serviceOptions: [
      { value: 'branding', label: 'Identidad de Marca' },
      { value: 'web', label: 'Desarrollo Web' },
      { value: 'ads', label: 'Anuncios Digitales' },
      { value: 'ecommerce', label: 'Comercio Electronico' },
      { value: 'social', label: 'Gestion de Redes Sociales' },
    ],
    budgetOptions: [
      { value: 'under_5k', label: 'Menos de $5,000' },
      { value: '5k_15k', label: '$5,000 - $15,000' },
      { value: '15k_50k', label: '$15,000 - $50,000' },
      { value: 'over_50k', label: 'Mas de $50,000' },
    ],
    timelineOptions: [
      { value: 'urgent', label: 'Urgente (1-2 semanas)' },
      { value: 'standard', label: 'Estandar (3-6 semanas)' },
      { value: 'relaxed', label: 'Sin prisa (2+ meses)' },
    ],
  },
};
