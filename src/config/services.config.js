/**
 * Configuración de todos los servicios externos - PRODUCCIÓN
 * Este archivo centraliza todas las credenciales y configuraciones de APIs
 */

// =======================================
// PAYPAL - SISTEMA DE PAGOS
// =======================================
export const paypalConfig = {
  clientId: 'AWxKgr5n7ex5Lc3fDBOooaVHLgcAB-KCrYXgCmit9DpNXFIuBa6bUypYFjr-hAqARlILGxk_rRTsBZeS',
  clientSecret: 'EO-ghpkDi_L5oQx9dkZPg3gABTs_UuWmsBtaexDyfYfXMhjbcJ3KK0LAuntr4zjoNSViGHZ_rkD7-YCt',
  mode: 'live', // 'sandbox' o 'live'
  currency: 'USD',
  paypalMe: 'https://paypal.me/asumerced',
  // Credenciales Sandbox para testing
  sandbox: {
    email: 'sb-efolr38427740@business.example.com',
    password: '1J;sW@^8',
    clientId: 'ARZdFZthRzwMXmYc9wtf0Zs4GVMHMbwVGE54_tzngzBT3OWjk4QT89XBVpcvZ57nYmNAZIJf1S4xgr7w',
    clientSecret: 'EBJTDwhXS5KZGKZnLv8BIc_W1E8ekmq_nEf8CJUEGrGSs8GjQRPIkjJkJFCoT5LV9eebNRhb-p0Ib9Pa'
  }
};

// =======================================
// CLOUDINARY - GESTIÓN DE IMÁGENES
// =======================================
export const cloudinaryConfig = {
  cloudName: 'dg3s7tqoj',
  apiKey: '673776954212897',
  apiSecret: 'MOzrryrl-3w0abD2YftOWYOs3O8',
  // Upload preset para imágenes
  uploadPresets: {
    products: 'products_preset',
    avatars: 'avatars_preset',
    documents: 'documents_preset'
  },
  // URLs
  baseUrl: 'https://api.cloudinary.com/v1_1/dg3s7tqoj',
  cdnUrl: `https://res.cloudinary.com/dg3s7tqoj`,
  // Configuración adicional
  untitledId: '471365939631829',
  untitledSecret: '6cR-6mdyi9R0NsrMg4Kdh_rH4FA'
};

// =======================================
// GOOGLE APIS - GEMINI Y SERVICIOS
// =======================================
export const googleConfig = {
  // Google Maps y servicios generales
  apiKey: 'AIzaSyA37SvhBU2-14l-UO5qBr7tLsjWE5nCAtw',
  projectName: 'abgapi',
  projectId: 'projects/885423115993',
  projectNumber: '885423115993',
  // Gemini AI
  gemini: {
    apiKey: 'AIzaSyAUUNTJ275mO4JyHw3S1RseumPB2L1e_tU',
    model: 'gemini-pro',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta'
  }
};

// =======================================
// GITHUB - INTEGRACIÓN Y DEPLOY
// =======================================
export const githubConfig = {
  // Tokens de acceso
  tokens: {
    main: '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',
    windsurf: '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',
    api: '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'
  },
  account: 'ecuadorabogado1@gmail.com'
};

// =======================================
// CLOUDFLARE WORKERS & DATABASES
// =======================================
export const cloudflareServices = {
  // Account Info
  accountId: '70661c46051942965565a5c976219dde',
  
  // Workers AI
  workersAI: {
    apiToken: '41-I78-j2fXWe4xT82Gx-OaLKAZjExGH8VwgsbRv',
    verifyUrl: 'https://api.cloudflare.com/client/v4/accounts/70661c46051942965565a5c976219dde/tokens/verify'
  },
  
  // KV Database
  kv: {
    namespaceId: '9585583f15824e6891e9660bd6f85d7d',
    binding: 'KV',
    databaseId: '0757f29fc8264ce985de8d780283d86e'
  },
  
  // D1 Database
  d1: {
    databaseId: '029949b9-4266-4060-8bcd-71525b26600c',
    databaseName: 'abogadosecuador',
    binding: 'DB',
    backupId: '0757f29fc8264ce985de8d780283d86e'
  },
  
  // API Tokens
  tokens: {
    global: '38fb66c17031310f94d2ddc9e7ed025878a69',
    originCA: 'v1.0-de7d653e9bdd51a050d020f9-ffd678d2059783b887438d9fa74a3beef4c76b31ce43837dfd0bc4fd7c1a3879d207e5a14b93f19f053c7534c7de3b4f3cf37dd1da11e4abafad30013c34f8f0daee9f2d1741b29c9a',
    create: 'w6scVTJZRE37pozxeSQLXjmZaZilDaKCVanxTo-A',
    workersEdit: '_ecllBBWXfnkFQyWt6kCg9c-OwN1EvK0WULk4OW6',
    dns: '3jRSE6bdEqud5BVyOsRSZWaZbiNwYitl3d7OEOe2'
  },
  
  // Worker deployment
  worker: {
    subdomain: 'ecuador.workers.dev',
    url: 'https://abogados.ecuador.workers.dev',
    name: 'abogados'
  }
};

// =======================================
// SUPABASE - BASE DE DATOS PRINCIPAL
// =======================================
export const supabaseFullConfig = {
  url: 'https://kbybhgxqdefuquybstqk.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJoZ3hxZGVmdXF1eWJzdHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAwODMsImV4cCI6MjA3MzEzNjA4M30.s1knFM9QXd8CH8TC0IOtBBBvb-qm2XYl_VlhVb-CqcE',
  databasePassword: '@#Zorretes1996',
  organization: 'abogadosecuador\'s Org',
  project: 'abogadosecuador\'s Project',
  // Configuración de conexión
  config: {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
};

// =======================================
// N8N - AUTOMATIZACIÓN Y WEBHOOKS
// =======================================
export const n8nConfig = {
  serviceId: 'srv-d31573gdl3ps73e2rdn0',
  baseUrl: 'https://n8n-latest-hurl.onrender.com',
  deployHook: 'https://api.render.com/deploy/srv-d31573gdl3ps73e2rdn0?key=jQgEE8ZMVgo',
  webhooks: {
    main: 'https://n8n-latest-hurl.onrender.com'
  }
};

// =======================================
// CONTACTO Y COMUNICACIÓN
// =======================================
export const communicationConfig = {
  email: 'ecuadorabogado1@gmail.com',
  whatsapp: {
    number: '+593988835269',
    api: '593988835269',
    link: 'https://wa.me/593988835269'
  }
};

// =======================================
// EXPORTAR TODA LA CONFIGURACIÓN
// =======================================
export default {
  paypal: paypalConfig,
  cloudinary: cloudinaryConfig,
  google: googleConfig,
  github: githubConfig,
  cloudflare: cloudflareServices,
  supabase: supabaseFullConfig,
  n8n: n8nConfig,
  communication: communicationConfig
};
