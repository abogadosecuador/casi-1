// Determinar la URL de API según el entorno
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:8787';
  }
  // En producción, usar la URL actual del worker
  return typeof window !== 'undefined' ? window.location.origin : 'https://abogados.ecuador.workers.dev';
};

export const globalConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://kbybhgxqdefuquybstqk.supabase.co',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJoZ3hxZGVmdXF1eWJzdHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAwODMsImV4cCI6MjA3MzEzNjA4M30.s1knFM9QXd8CH8TC0IOtBBBvb-qm2XYl_VlhVb-CqcE',
  apiUrl: getApiUrl(),
  isDevelopment: import.meta.env.DEV || false,
  isProduction: import.meta.env.PROD || true,
  VITE_SUPABASE_CLIENT_INSTANCE_ID: 'abogadosecuador-production'
};

export default globalConfig;
