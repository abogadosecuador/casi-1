import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_URL : 
                     (typeof window !== 'undefined' ? window.__ENV__?.VITE_SUPABASE_URL : 
                     'https://kbybhgxqdefuquybstqk.supabase.co'));
const supabaseKey = (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_KEY : 
                     (typeof window !== 'undefined' ? window.__ENV__?.VITE_SUPABASE_KEY : 
                     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJoZ3hxZGVmdXF1eWJzdHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAwODMsImV4cCI6MjA3MzEzNjA4M30.s1knFM9QXd8CH8TC0IOtBBBvb-qm2XYl_VlhVb-CqcE'));

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})
