export const globalConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://kbybhgxqdefuquybstqk.supabase.co',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJoZ3hxZGVmdXF1eWJzdHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAwODMsImV4cCI6MjA3MzEzNjA4M30.s1knFM9QXd8CH8TC0IOtBBBvb-qm2XYl_VlhVb-CqcE',
  apiUrl: import.meta.env.VITE_API_URL || 'https://abogados.ecuador.workers.dev',
  isDevelopment: import.meta.env.DEV || false,
  isProduction: import.meta.env.PROD || true,
  VITE_SUPABASE_CLIENT_INSTANCE_ID: 'abogadosecuador-production'
};

export default globalConfig;
