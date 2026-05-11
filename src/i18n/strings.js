/**
 * Archivo central de strings de UI para internacionalización (i18n).
 * * Todas las cadenas visibles al usuario deben referenciarse desde aquí.
 * * En el futuro, este archivo se reemplazará por un sistema completo de i18n
 * * (react-i18next, react-intl, etc.) para soportar el mercado de California (inglés).
 *
 * Cada sección usa un namespace que corresponde al componente o página.
 * Estructura pensada para migración sencilla a archivos JSON por idioma.
 */

export const STRINGS = {
  /* ──────────────── Navbar ──────────────── */
  nav: {
    brandName: "Stratedge",
    brandSuffix: "Marketing",
    links: {
      home: "Inicio",
      portfolio: "Portafolio",
      services: "Servicios",
    },
    cta: "Cotizar Proyecto",
  },

  /* ──────────────── Hero ──────────────── */
  hero: {
    tagline: "Agencia de Marketing Digital & Estrategia Avanzada",
    headlineLine1: "Estrategias que Impulsan.",
    headlineLine2: "Resultados que Perduran.",
    description:
      "En Stratedge Marketing LLC, fusionamos análisis de precisión con creatividad de alto impacto para transformar su visión en crecimiento sostenible.",
    ctaPrimary: "Cotizar Proyecto",
    ctaSecondary: "Nuestros Servicios",
  },

  /* ──────────────── Footer ──────────────── */
  footer: {
    brandName: "Stratedge",
    brandSuffix: "Marketing LLC",
    copyright: (year) => `© ${year} Todos los derechos reservados.`,
    links: {
      privacy: "Aviso de Privacidad",
      terms: "Términos y Condiciones",
      instagram: "Instagram",
    },
  },

  /* ──────────────── Portafolio ──────────────── */
  portfolio: {
    heading: "Nuestros",
    headingAccent: "Casos de Éxito",
    description:
      "Explora cómo hemos ayudado a empresas líderes a transformar su presencia digital y dominar sus respectivos mercados.",
    clientLabel: "Cliente:",
  },

  /* ──────────────── Página Cotizador ──────────────── */
  cotizador: {
    heading: "Cotiza tu",
    headingAccent: "Proyecto",
    description:
      "Cuéntanos sobre tu visión. Completa estos sencillos pasos y obtén un estimado al instante.",
  },

  /* ──────────────── Wizard ──────────────── */
  wizard: {
    /* Etiquetas de progreso y navegación */
    stepLabel: (current, total) => `Paso ${current} de ${total}`,
    back: "← Anterior",
    next: "Siguiente →",
    submit: "Enviar Cotización",
    submitting: "Enviando...",

    /* Paso 1: Servicios */
    step1: {
      heading: "¿Qué necesitas?",
      serviceLabel: "Selecciona el servicio principal",
      scopeLabel: "Cuéntanos brevemente sobre tu proyecto",
      scopePlaceholder:
        "Ej: Quiero rediseñar mi sitio web y lanzar campañas en Meta Ads para aumentar ventas...",
    },

    /* Paso 2: Presupuesto y plazos */
    step2: {
      heading: "Presupuesto y Plazos",
      budgetLabel: "¿Cuál es tu presupuesto estimado?",
      budgetPlaceholder: "Selecciona un rango",
      timelineLabel: "¿Para cuándo lo necesitas?",
      timelinePlaceholder: "Selecciona la urgencia",
      notesLabel: "Notas adicionales (opcional)",
      notesPlaceholder: "Cualquier detalle adicional que quieras compartir...",
    },

    /* Paso 3: Contacto */
    step3: {
      heading: "Tus Datos",
      description:
        "Déjanos tus datos y te enviaremos la cotización en menos de 24 horas.",
      fullName: "Nombre completo",
      fullNamePlaceholder: "Ej: Ana García",
      email: "Correo electrónico",
      emailPlaceholder: "ana@empresa.com",
      company: "Empresa",
      companyPlaceholder: "Nombre de tu empresa",
      phone: "Teléfono (opcional)",
      phonePlaceholder: "+52 55 1234 5678",
    },

    /* Mensajes de error de validación (Zod) */
    errors: {
      serviceRequired: "Selecciona al menos un servicio",
      scopeMin: "Describe tu proyecto con al menos 10 caracteres",
      budgetRequired: "Selecciona un rango de presupuesto",
      timelineRequired: "Selecciona la urgencia del proyecto",
      fullNameMin: "El nombre debe tener al menos 2 caracteres",
      emailInvalid: "Ingresa un correo electrónico válido",
      companyMin: "Ingresa el nombre de tu empresa",
    },

    /* Mensajes de éxito */
    success: "¡Cotización enviada! Te contactaremos pronto.",

    /* Opciones de datos (también visibles en UI) */
    serviceOptions: [
      { value: "branding", label: "Branding e Identidad Visual" },
      { value: "web", label: "Desarrollo Web / App" },
      { value: "ads", label: "Publicidad Digital (Ads)" },
      { value: "ecommerce", label: "Optimización E-Commerce" },
      { value: "social", label: "Gestión de Redes Sociales" },
    ],

    budgetOptions: [
      { value: "under_5k", label: "Menos de $5,000" },
      { value: "5k_15k", label: "$5,000 — $15,000" },
      { value: "15k_50k", label: "$15,000 — $50,000" },
      { value: "over_50k", label: "Más de $50,000" },
    ],

    timelineOptions: [
      { value: "urgent", label: "Urgente (1-2 semanas)" },
      { value: "standard", label: "Estándar (3-6 semanas)" },
      { value: "relaxed", label: "Sin prisa (2+ meses)" },
    ],
  },
};
