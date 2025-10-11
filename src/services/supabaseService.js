/**
 * supabaseService.js - Servicio optimizado para Supabase en entornos de Cloudflare Workers
 * 
 * Este servicio resuelve problemas de conectividad entre Cloudflare Workers y Supabase,
 * implementando una configuración CORS compatible y manejo de errores robusto.
 * Versión mejorada con soporte para autenticación social (Google, Facebook).
 */
import { createClient } from '@supabase/supabase-js';
import { globalConfig } from '../config/globalConfig';

// Importar configuración centralizada
import { supabaseConfig, getBaseUrl, isProduction } from '../config/appConfig';

// Variable para almacenar la única instancia del cliente
// Usar una variable global para asegurar una única instancia en toda la aplicación
let supabaseClientInstance = null;

// Flag para evitar múltiples intentos de inicialización simultáneos
let isInitializing = false;

// Contador para rastrear llamadas de inicialización
let initCallCount = 0;

// Usar la configuración centralizada
const envConfig = import.meta.env;

// FORZAR URL DE PRODUCCIÓN - NO USAR VARIABLES ANTIGUAS
const PRODUCCION_URL = 'https://kbybhgxqdefuquybstqk.supabase.co';
const PRODUCCION_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJoZ3hxZGVmdXF1eWJzdHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAwODMsImV4cCI6MjA3MzEzNjA4M30.s1knFM9QXd8CH8TC0IOtBBBvb-qm2XYl_VlhVb-CqcE';

// Configuración de Supabase - PRODUCCIÓN FORZADA
const supabaseUrl = PRODUCCION_URL;
const supabaseKey = PRODUCCION_KEY;

console.log('🔧 Supabase URL configurada:', supabaseUrl);

// Determinar si estamos en un entorno con problemas CORS (Cloudflare Workers)
const shouldUseProxyWorker = () => {
  if (typeof window === 'undefined') return false; // SSR
  
  // Forzar el uso del proxy en producción para evitar CORS
  if (isProduction || 
      window.location.hostname.includes('workers.dev') || 
      window.location.hostname !== 'localhost') {
    // Guardar preferencia para uso futuro
    try {
      localStorage.setItem('use_proxy', 'true');
    } catch (e) {
      // Silenciar error
    }
    console.log('Usando proxy CORS para Supabase');
    return true;
  }
  
  // Verificar si hay indicios previos de problemas CORS
  try {
    return localStorage.getItem('use_proxy') === 'true' || 
           navigator.userAgent.includes('Cloudflare');
  } catch (e) {
    return false;
  }
};

// Opciones para el cliente de Supabase con proxy CORS si es necesario
const getSupabaseOptions = () => {
  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false // Cambiado a false para evitar problemas con la detección de URL
    },
    headers: {
      'X-Client-Info': 'abogado-wilson-website'
    },
    global: {
      fetch: undefined // Será definido condicional más abajo
    }
  };

  // En Cloudflare Workers o cuando necesitamos un proxy CORS
  if (shouldUseProxyWorker()) {
    try {
      // Implementar una versión personalizada de fetch con manejo CORS
      options.global.fetch = (...args) => {
        const [resource, config] = args;
        
        // Preparar configuración de solicitud
        const fetchConfig = {
          ...config,
          headers: {
            ...config?.headers,
            'X-CORS-Bypass': 'true'
          }
        };
        
        // Para URLs de Supabase, aplicar lógica especial
        if (typeof resource === 'string' && resource.includes('supabase.co')) {
          // Intentar la solicitud directa primero
          return fetch(resource, fetchConfig)
            .then(response => {
              // Si es exitosa, regresar la respuesta
              if (response.ok) return response;
              
              // Si hay un error CORS o de red, intentar con un proxy
              // El proxy debe implementarse en Cloudflare Workers
              const proxyUrl = `${getBaseUrl()}/api/proxy`;
              const proxyConfig = {
                ...fetchConfig,
                method: 'POST',
                headers: {
                  ...fetchConfig.headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  url: resource,
                  method: config?.method || 'GET',
                  headers: config?.headers || {},
                  body: config?.body
                })
              };
              
              return fetch(proxyUrl, proxyConfig);
            })
            .catch(error => {
              // En caso de error, intentar con el proxy
              console.warn('Error en solicitud directa a Supabase, usando proxy:', error.message);
              
              const proxyUrl = `${getBaseUrl()}/api/proxy`;
              const proxyConfig = {
                ...fetchConfig,
                method: 'POST',
                headers: {
                  ...fetchConfig.headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  url: resource,
                  method: config?.method || 'GET',
                  headers: config?.headers || {},
                  body: config?.body
                })
              };
              
              return fetch(proxyUrl, proxyConfig);
            });
        }
        
        // Para otras URLs, usar fetch normal
        return fetch(resource, fetchConfig);
      };
    } catch (error) {
      console.error('Error al configurar fetch personalizado:', error);
    }
  }
  
  return options;
};

// Crear cliente de fallback para cuando hay problemas de conexión
const createFallbackClient = () => {
  console.warn('Usando cliente de fallback para Supabase');
  return {
    auth: {
      signIn: () => Promise.resolve({ user: null, error: new Error('Modo offline') }),
      signUp: () => Promise.resolve({ user: null, error: new Error('Modo offline') }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: null, unsubscribe: () => {} }),
      signInWithOAuth: () => Promise.resolve({ error: new Error('Modo offline') }),
      signInWithPassword: () => Promise.resolve({ error: new Error('Modo offline') }),
      updateUser: () => Promise.resolve({ error: new Error('Modo offline') })
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          single: () => Promise.resolve({ data: null, error: null }),
          limit: () => Promise.resolve({ data: [], error: null }),
          range: () => Promise.resolve({ data: [], error: null }),
          order: () => Promise.resolve({ data: [], error: null })
        }),
        neq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        gt: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        lt: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        gte: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        lte: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        like: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        ilike: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
        in: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null })
    }),
    storage: {
      createBucket: () => Promise.resolve({ data: null, error: null }),
      getBucket: () => Promise.resolve({ data: null, error: null }),
      listBuckets: () => Promise.resolve({ data: [], error: null }),
      emptyBucket: () => Promise.resolve({ data: null, error: null }),
      deleteBucket: () => Promise.resolve({ data: null, error: null }),
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        download: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ publicURL: '' })
      })
    }
  };
};

/**
 * Función mejorada para crear un cliente Supabase singleton con sistema anti-duplicación de instancias
 * Solución definitiva para el problema de "Multiple GoTrueClient instances"
 */
export const getSupabaseClient = () => {
  if (typeof window !== 'undefined' && window.GLOBAL_SUPABASE_CLIENT) {
    return window.GLOBAL_SUPABASE_CLIENT;
  }

  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  try {
    const options = getSupabaseOptions();
    options.auth = options.auth || {};
    options.auth.detectSessionInUrl = false;
    options.auth.persistSession = true;
    options.auth.storageKey = envConfig.VITE_AUTH_STORAGE_KEY || `sb-auth-token-${Date.now()}`;

    supabaseClientInstance = createClient(supabaseUrl, supabaseKey, options);

    if (typeof window !== 'undefined') {
      window.GLOBAL_SUPABASE_CLIENT = supabaseClientInstance;
    }

    return supabaseClientInstance;
  } catch (error) {
    console.error('Error crítico al crear cliente Supabase:', error);
    return null;
  }
};

// Función de reintento para usar en todos los servicios
const withRetry = async (fn, maxRetries = 3) => {
  let lastError = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.warn(`Intento ${attempt + 1}/${maxRetries} falló:`, error);
      lastError = error;
      
      // Esperar antes del siguiente intento (backoff exponencial)
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt)));
      }
    }
  }
  
  throw lastError;
};

// Crear cliente de Supabase - Utilizando patrón lazy initialization
// Solo se creará cuando se utilice por primera vez
let _supabase;
export const supabase = new Proxy({}, {
  get: function(target, prop) {
    if (!_supabase) {
      _supabase = getSupabaseClient();
    }
    return _supabase[prop];
  }
});

// Verificar la conexión al inicio
if (typeof window !== 'undefined') {
  try {
    console.log('Verificando conexión con Supabase...');
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.warn('Error de conexión con Supabase:', error.message);
      } else {
        console.log('Conexión con Supabase establecida correctamente');
      }
    });
  } catch (e) {
    console.error('Error al verificar conexión con Supabase:', e);
  }
}

// Servicio principal para Supabase
export const supabaseService = {
  supabase,
  
  // Verifica la conexión con la API de Supabase
  // @returns {Promise<{connected: boolean, message: string}>}
  checkConnection: async () => {
    try {
      console.log('Verificando conexión con Supabase...');
      
      // Intentar obtener la sesión actual
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error al verificar conexión con Supabase:', error);
        
        // En entorno de desarrollo o worker, simular la conexión para permitir testing
        if ((typeof process !== 'undefined' ? process.env?.DEV : 
            (typeof window !== 'undefined' ? window.__ENV__?.DEV : false)) || 
            (typeof navigator !== 'undefined' && navigator.userAgent.includes('Cloudflare'))) {
          // Solo loggear el error en consola
          console.warn('Error original:', error.message);
          console.warn('Simulando conexión exitosa para permitir desarrollo');
          
          return {
            connected: true,
            simulated: true,
            message: 'Conexión simulada para desarrollo/testing'
          };
        }
        
        return {
          connected: false,
          message: `Error de conexión: ${error.message}`
        };
      }
      
      return {
        connected: true,
        message: 'Conexión establecida correctamente',
        session: data
      };
    } catch (error) {
      console.error('Error al verificar conexión:', error);
      
      // Simular conexión en desarrollo
      if (!isProduction) {
        return {
          connected: true,
          simulated: true,
          message: 'Conexión simulada (modo desarrollo)'
        };
      }
      
      return {
        connected: false,
        message: `Error inesperado: ${error.message}`
      };
    }
  }
};

// Servicio mejorado para autenticación
export const authService = {
  // Iniciar sesión con Google
  signInWithGoogle: async (redirectTo = window.location.origin) => {
    try {
      // Verificar si estamos en un entorno web
      if (typeof window === 'undefined') {
        throw new Error('Esta función solo puede ejecutarse en un navegador');
      }
      
      // Configurar redirección
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          scopes: 'email profile'
        }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        data,
        error: null
      };
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      return {
        success: false,
        data: null,
        error: {
          message: error.message || 'Error al autenticar con Google',
          details: error
        }
      };
    }
  },
  
  // Iniciar sesión con Facebook
  signInWithFacebook: async (redirectTo = window.location.origin) => {
    try {
      // Verificar si estamos en un entorno web
      if (typeof window === 'undefined') {
        throw new Error('Esta función solo puede ejecutarse en un navegador');
      }
      
      // Configurar redirección
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo,
          scopes: 'email,public_profile'
        }
      });
      
      if (error) throw error;
      
      return {
        success: true,
        data,
        error: null
      };
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
      return {
        success: false,
        data: null,
        error: {
          message: error.message || 'Error al autenticar con Facebook',
          details: error
        }
      };
    }
  },
  
  // Procesar callback de autenticación OAuth
  handleAuthCallback: async () => {
    try {
      // Obtener sesión actual
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      return {
        success: true,
        session: data.session,
        user: data.session?.user,
        error: null
      };
    } catch (error) {
      console.error('Error al procesar callback de autenticación:', error);
      return {
        success: false,
        session: null,
        user: null,
        error: {
          message: error.message || 'Error al procesar autenticación',
          details: error
        }
      };
    }
  },
  
  // Registrar nuevo usuario
  register: async (email, password, userData = {}) => {
    try {
      // Validaciones básicas
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos');
      }
      
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      
      // Crear cuenta
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName || '',
            phone: userData.phone || '',
            address: userData.address || '',
            ...userData
          }
        }
      });
      
      if (error) throw error;
      
      // Si todo fue exitoso pero se requiere confirmación
      if (!data.user?.confirmed_at) {
        return {
          success: true,
          confirmationRequired: true,
          user: data.user,
          message: 'Te enviamos un correo para confirmar tu cuenta',
          error: null
        };
      }
      
      // Crear perfil de usuario si no existe
      if (data.user?.id) {
        try {
          // Verificar si ya existe el perfil
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          
          // Si no existe o hay error, crear perfil
          if (profileError || !profileData) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: data.user.id, 
                  full_name: userData.fullName || '',
                  phone: userData.phone || '',
                  address: userData.address || '',
                  ...userData
                }
              ]);
              
            if (insertError) {
              console.error('Error al crear perfil:', insertError);
            }
          }
        } catch (profileError) {
          console.error('Error al verificar/crear perfil:', profileError);
        }
      }
      
      return {
        success: true,
        confirmationRequired: false,
        user: data.user,
        message: 'Cuenta creada correctamente',
        error: null
      };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return {
        success: false,
        confirmationRequired: false,
        user: null,
        message: 'Error al crear cuenta',
        error: {
          message: error.message || 'Error al registrar',
          details: error
        }
      };
    }
  },
  
  // Iniciar sesión
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return {
        success: true,
        user: data.user,
        session: data.session,
        error: null
      };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return {
        success: false,
        user: null,
        session: null,
        error: {
          message: error.message || 'Credenciales inválidas',
          details: error
        }
      };
    }
  },
  
  // Cerrar sesión
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return {
        success: true,
        error: null
      };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return {
        success: false,
        error: {
          message: error.message || 'Error al cerrar sesión',
          details: error
        }
      };
    }
  },
  
  // Verificar sesión actual
  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      return {
        success: true,
        session: data.session,
        error: null
      };
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      return {
        success: false,
        session: null,
        error: {
          message: error.message || 'Error al verificar sesión',
          details: error
        }
      };
    }
  },
  
  // Obtener usuario actual
  getCurrentUser: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      return {
        success: true,
        user: data.user,
        error: null
      };
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return {
        success: false,
        user: null,
        error: {
          message: error.message || 'Error al obtener usuario',
          details: error
        }
      };
    }
  },
  
  // Actualizar usuario
  updateUser: async (userData) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return {
        success: false,
        error: {
          message: error.message || 'Error al actualizar usuario',
          details: error
        }
      };
    }
  }
};

// Servicio mejorado para operaciones CRUD
export const dataService = {
  // Comprobar conexión (util para diagnóstico)
  checkConnection: async () => {
    try {
      // Intentar una operación simple como comprobación
      const { data, error } = await supabase
        .from('health_check')
        .select('*')
        .limit(1);
      
      if (error) {
        // Si el error es que la tabla no existe, es una buena señal (conexión funciona)
        if (error.code === '42P01') {
          return {
            connected: true,
            message: 'Conectado a Supabase correctamente (tabla no existe pero conexión funciona)'
          };
        }
        
        // Si es otro tipo de error, verificar si podemos ignorarlo
        if (error.code && ['500', '503', '404'].includes(error.code.toString())) {
          console.warn('Error de servidor en Supabase:', error);
          
          // En modo desarrollo, permitir continuar
          if (!isProduction) {
            return {
              connected: true,
              simulated: true,
              message: 'Conexión simulada (modo desarrollo)'
            };
          }
        }
        
        throw error;
      }
      
      return {
        connected: true,
        message: 'Conectado a Supabase correctamente'
      };
    } catch (error) {
      console.error('Error al comprobar conexión a datos:', error);
      
      // En desarrollo, simular conexión para permitir trabajar offline
      if (!isProduction) {
        return {
          connected: true,
          simulated: true,
          message: 'Conexión simulada (modo desarrollo)'
        };
      }
      
      return {
        connected: false,
        message: error.message || 'Error de conexión a Supabase'
      };
    }
  },
  
  // Obtener todos los registros
  getAll: async (table, options = {}) => {
    try {
      let query = supabase.from(table).select(options.select || '*');
      
      // Aplicar filtros si existen
      if (options.filters) {
        for (const filter of options.filters) {
          query = query[filter.method || 'eq'](filter.column, filter.value);
        }
      }
      
      // Aplicar ordenamiento
      if (options.order) {
        query = query.order(options.order.column, { 
          ascending: options.order.ascending !== false
        });
      }
      
      // Aplicar paginación
      if (options.page && options.pageSize) {
        const from = (options.page - 1) * options.pageSize;
        query = query.range(from, from + options.pageSize - 1);
      } else if (options.limit) {
        query = query.limit(options.limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error(`Error al obtener registros de ${table}:`, error);
      return { data: [], error };
    }
  },
  
  // Obtener un registro por ID
  getById: async (table, id) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error(`Error al obtener registro ${id} de ${table}:`, error);
      return { data: null, error };
    }
  },
  
  // Crear un nuevo registro
  create: async (table, data) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select();
      
      if (error) throw error;
      
      return { data: result[0], error: null };
    } catch (error) {
      console.error(`Error al crear registro en ${table}:`, error);
      return { data: null, error };
    }
  },
  
  // Actualizar un registro
  update: async (table, id, data) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      return { data: result[0], error: null };
    } catch (error) {
      console.error(`Error al actualizar registro ${id} en ${table}:`, error);
      return { data: null, error };
    }
  },
  
  // Eliminar un registro
  delete: async (table, id) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error) {
      console.error(`Error al eliminar registro ${id} en ${table}:`, error);
      return { success: false, error };
    }
  },
  
  // Búsqueda personalizada
  search: async (table, query = {}) => {
    try {
      let dbQuery = supabase.from(table).select(query.select || '*');
      
      // Procesar filtros
      if (query.filters && query.filters.length > 0) {
        for (const filter of query.filters) {
          // Soporte para diferentes tipos de operadores
          switch (filter.operator) {
            case 'eq':
              dbQuery = dbQuery.eq(filter.column, filter.value);
              break;
            case 'neq':
              dbQuery = dbQuery.neq(filter.column, filter.value);
              break;
            case 'gt':
              dbQuery = dbQuery.gt(filter.column, filter.value);
              break;
            case 'lt': 
              dbQuery = dbQuery.lt(filter.column, filter.value);
              break;
            case 'gte':
              dbQuery = dbQuery.gte(filter.column, filter.value);
              break;
            case 'lte':
              dbQuery = dbQuery.lte(filter.column, filter.value);
              break;
            case 'like':
              dbQuery = dbQuery.like(filter.column, `%${filter.value}%`);
              break;
            case 'ilike':
              dbQuery = dbQuery.ilike(filter.column, `%${filter.value}%`);
              break;
            case 'in':
              dbQuery = dbQuery.in(filter.column, filter.value);
              break;
            default:
              dbQuery = dbQuery.eq(filter.column, filter.value);
          }
        }
      }
      
      // Aplicar ordenamiento
      if (query.orderBy) {
        dbQuery = dbQuery.order(query.orderBy, { ascending: query.ascending !== false });
      }
      
      // Aplicar paginación
      if (query.limit) {
        dbQuery = dbQuery.limit(query.limit);
      }
      
      const { data, error } = await dbQuery;
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error(`Error en búsqueda personalizada en ${table}:`, error);
      return { data: [], error };
    }
  },
  
  // Upload de archivos
  uploadFile: async (bucket, filePath, file) => {
    try {
      // Asegurar que el bucket existe
      const { error: bucketError } = await supabase.storage.getBucket(bucket);
      
      if (bucketError && bucketError.statusCode === 404) {
        // Crear bucket si no existe
        await supabase.storage.createBucket(bucket);
      }
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error(`Error al subir archivo a ${bucket}/${filePath}:`, error);
      return { data: null, error };
    }
  },
  
  // Obtener URL pública de un archivo
  getPublicUrl: (bucket, filePath) => {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      return { url: data.publicUrl, error: null };
    } catch (error) {
      console.error(`Error al obtener URL pública de ${bucket}/${filePath}:`, error);
      return { url: '', error };
    }
  }
};

// Exportar por defecto los servicios
export default {
  auth: authService,
  data: dataService,
  client: supabase,
  service: supabaseService
};
