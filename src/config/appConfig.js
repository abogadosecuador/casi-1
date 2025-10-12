/**
 * Configuración global de la aplicación
 * 
 * Este archivo centraliza todas las configuraciones, API keys, enlaces sociales
 * y demás información importante para la aplicación.
 */

// Entorno de la aplicación
export const isProduction = typeof process !== 'undefined' ? process.env?.PROD : 
                           (typeof window !== 'undefined' ? window.__ENV__?.PROD : false);
export const isDevelopment = !isProduction;

// URLs base - siempre usar el origen actual en producción
export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback para SSR o contextos sin window
  return 'https://abogados.ecuador.workers.dev';
};

// Información de contacto
export const contactInfo = {
  // Correos electrónicos
  emails: {
    primary: "ecuadorabogado1@gmail.com",
    secondary: "alexip2@hotmail.com"
  },
  
  // Teléfonos
  phones: {
    primary: "+593988835269",
    whatsappApi: "593988835269" // Sin el + para la API de WhatsApp
  },
  
  // Dirección
  address: "Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador",
  
  // Horario
  businessHours: "Lunes a Viernes: 8:00 - 18:00"
};

// Redes sociales
export const socialMedia = {
  // Facebook
  facebook: {
    pagina: "https://www.facebook.com/share/1AF7jU97kh/",
    groups: {
      derechoEcuador: "https://www.facebook.com/groups/1409181976927303/?ref=share&mibextid=NSMWBT",
      abogadosEcuador: "https://www.facebook.com/groups/1046470634036664/?ref=share&mibextid=NSMWBT"
    }
  },
  
  // Twitter/X
  twitter: {
    profile: "https://x.com/Wilsonelm?t=e_4JumFg2kRM5Baa_pP2JA&s=09",
    username: "@wilsonelm"
  },
  
  // WhatsApp
  whatsapp: {
    comunidad: "https://chat.whatsapp.com/IcEzDg0dFay5xmzV8NeQpA",
    grupo: "https://chat.whatsapp.com/JI57y20YAsXAzvxpegahUd",
    api: `https://wa.me/593988835269`
  }
};

// Servicios externos y APIs
export const externalServices = {
  // n8n
  n8n: {
    baseUrl: "https://n8n-latest-hurl.onrender.com",
    webhooks: {
      production: "https://n8n-latest-hurl.onrender.com"
    },
    deployHook: "https://api.render.com/deploy/srv-d31573gdl3ps73e2rdn0?key=jQgEE8ZMVgo"
  },
  
  // OpenRouter para IA
  openRouter: {
    apiKey: "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"
  },
  
  // Turso Database
  turso: {
    databaseUrl: "libsql://abogadowilson-abogadowilson.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicm8iLCJnaWQiOiJiOTJkODlhMi0wNWQ4LTQ0YjUtYWE4OS1iMTc5MzU1YzIyMmIiLCJpYXQiOjE3NDI3ODAxNzMsInJpZCI6IjAzNjkwMTA4LWEyOGQtNDk3ZC1iNzMyLTA5YzhiYWE4OTlhOSJ9.X2ZZbus9HbjQeGvnCRSx3y13U2MsriMu3dzx96eimj7yaNVKKgPWjCsnGDcSxgOoH5fENalLAhQsAjMNwOgkAg"
  },
  
  // Prisma
  prisma: {
    databaseUrl: "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMTRhNDU5ZTgtNjYxOC00ZGNmLTk1MWItYzAxMjNhNDFkMGE3IiwidGVuYW50X2lkIjoiY2IxYzRhMjEwMGZjYzA3YjQ4ZmI3MWY5Mzc2ZGFiMzhkNmYxMDBmYTY0NmVhYTY4NmVhYjRmYjQwOTgwYjFjOSIsImludGVybmFsX3NlY3JldCI6IjllOTVjNDRjLWEzNzItNDAwYi05ODY5LTk3OTkzMjBmYjYxMSJ9.RAhNmhcUfJpMRWb296WK1bZL6oXTg3Rt1kXfeSs_SyE",
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMmM1Y2UzYjAtMDM0OC00MmU0LWE4NTUtM2FiZjQwOWI5OWQ5IiwidGVuYW50X2lkIjoiY2IxYzRhMjEwMGZjYzA3YjQ4ZmI3MWY5Mzc2ZGFiMzhkNmYxMDBmYTY0NmVhYTY4NmVhYjRmYjQwOTgwYjFjOSIsImludGVybmFsX3NlY3JldCI6IjllOTVjNDRjLWEzNzItNDAwYi05ODY5LTk3OTkzMjBmYjYxMSJ9.tX-fqerLHhznPGz4DbrXoVW08tUpTADWPT8EFMcCm6M"
  }
};

// Configuración de Cloudflare
export const cloudflareConfig = {
  accountId: "70661c46051942965565a5c976219dde",
  apiToken: "41-I78-j2fXWe4xT82Gx-OaLKAZjExGH8VwgsbRv",
  kvNamespaceId: "9585583f15824e6891e9660bd6f85d7d",
  d1DatabaseId: "029949b9-4266-4060-8bcd-71525b26600c",
  workersAI: "41-I78-j2fXWe4xT82Gx-OaLKAZjExGH8VwgsbRv",
  globalApiKey: "38fb66c17031310f94d2ddc9e7ed025878a69",
  originCA: "v1.0-de7d653e9bdd51a050d020f9-ffd678d2059783b887438d9fa74a3beef4c76b31ce43837dfd0bc4fd7c1a3879d207e5a14b93f19f053c7534c7de3b4f3cf37dd1da11e4abafad30013c34f8f0daee9f2d1741b29c9a",
  createToken: "w6scVTJZRE37pozxeSQLXjmZaZilDaKCVanxTo-A",
  workersEdit: "_ecllBBWXfnkFQyWt6kCg9c-OwN1EvK0WULk4OW6",
  dnsToken: "3jRSE6bdEqud5BVyOsRSZWaZbiNwYitl3d7OEOe2",
  subdomain: "ecuador.workers.dev",
  workerUrl: "https://abogados.ecuador.workers.dev",
  // URL alternativa del worker
  workerUrlAlt: "https://abogado-wilson.anipets12.workers.dev"
};

// Configuración de Supabase - PRODUCCIÓN
export const supabaseConfig = {
  url: typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_URL : 
      (typeof window !== 'undefined' ? window.__ENV__?.VITE_SUPABASE_URL : 
      'https://kbybhgxqdefuquybstqk.supabase.co'),
  key: typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_KEY : 
      (typeof window !== 'undefined' ? window.__ENV__?.VITE_SUPABASE_KEY : 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJoZ3hxZGVmdXF1eWJzdHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAwODMsImV4cCI6MjA3MzEzNjA4M30.s1knFM9QXd8CH8TC0IOtBBBvb-qm2XYl_VlhVb-CqcE'),
  databasePassword: '@#Zorretes1996',
  orgName: 'abogadosecuador\'s Org',
  projectName: 'abogadosecuador\'s Project',
  headers: {
    'X-Client-Info': 'abogadosecuador-production'
  }
};

// Configuración de correo electrónico
export const emailConfig = {
  serviceId: typeof process !== 'undefined' ? process.env?.VITE_EMAIL_SERVICE_ID : 
            (typeof window !== 'undefined' ? window.__ENV__?.VITE_EMAIL_SERVICE_ID : 'default_service'),
  templateId: typeof process !== 'undefined' ? process.env?.VITE_EMAIL_TEMPLATE_ID : 
             (typeof window !== 'undefined' ? window.__ENV__?.VITE_EMAIL_TEMPLATE_ID : 'default_template'),
  userId: typeof process !== 'undefined' ? process.env?.VITE_EMAIL_USER_ID : 
         (typeof window !== 'undefined' ? window.__ENV__?.VITE_EMAIL_USER_ID : 'default_user')
};

// Configuración de reCAPTCHA
export const recaptchaConfig = {
  siteKey: typeof process !== 'undefined' ? process.env?.VITE_RECAPTCHA_SITE_KEY : 
          (typeof window !== 'undefined' ? window.__ENV__?.VITE_RECAPTCHA_SITE_KEY : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'), // Clave de prueba
};

// Configuración de Turnstile
export const turnstileConfig = {
  siteKey: typeof process !== 'undefined' ? process.env?.VITE_TURNSTILE_SITE_KEY : 
          (typeof window !== 'undefined' ? window.__ENV__?.VITE_TURNSTILE_SITE_KEY : '0x4AAAAAAABY3h5dF4SWQyP'),
};

// URLs del API
export const apiUrls = {
  base: typeof process !== 'undefined' ? process.env?.VITE_API_URL : 
       (typeof window !== 'undefined' ? window.__ENV__?.VITE_API_URL : '/api'),
  blog: '/api/blog',
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  courses: '/api/courses',
  ebooks: '/api/ebooks',
  consultation: '/api/consultation',
  checkout: '/api/checkout',
};

// Configuración JWT
export const jwtConfig = {
  secret: "abogadowilsonsecretkeyforsecuritytokens2025",
  expiresIn: "7d" // 7 días
};

// Exportar configuración completa
export default {
  isProduction,
  isDevelopment,
  getBaseUrl,
  contactInfo,
  socialMedia,
  externalServices,
  cloudflareConfig,
  supabaseConfig,
  emailConfig,
  recaptchaConfig,
  turnstileConfig,
  apiUrls,
  jwtConfig
};
