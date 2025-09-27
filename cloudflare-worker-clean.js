// Cloudflare D1 Database support

/**
 * Cloudflare Worker limpio y compatible para Abogado Wilson
 * Este archivo resuelve los problemas de sintaxis del worker original
 */

// Función para obtener variables de entorno o valores por defecto
function getEnvVariable(env, name, defaultValue) {
  return env && env[name] !== undefined ? env[name] : defaultValue;
}

// Inicialización tardía de variables globales
let ENV = null;

// Función para inicializar variables globales
function initEnv(env) {
  return {
    SUPABASE_URL: getEnvVariable(env, 'SUPABASE_URL', ''),
    SUPABASE_KEY: getEnvVariable(env, 'SUPABASE_KEY', ''),
    ENVIRONMENT: getEnvVariable(env, 'ENVIRONMENT', 'development'), // Default to development for local
    API_ENABLED: getEnvVariable(env, 'API_ENABLED', 'true') === 'true',
    CORS_ORIGIN: getEnvVariable(env, 'CORS_ORIGIN', '*'),
    WHATSAPP_NUMBER: getEnvVariable(env, 'WHATSAPP_NUMBER', '+59398835269'),
    N8N_WEBHOOK_URL: getEnvVariable(env, 'N8N_WEBHOOK_URL', 'https://n8nom.onrender.com/webhook/1cfd2baa-f5ec-4bc4-a99d-dfb36793eabd'),
    CONTACT_EMAIL: getEnvVariable(env, 'CONTACT_EMAIL', 'Wifirmalegal@gmail.com'),
  };
}

// Configuración estándar de CORS
const standardHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-cache', // No cache for API
  'X-Content-Type-Options': 'nosniff'
};

// --- API ROUTER ---
async function handleApiRequest(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Check if D1 database binding is available
    if (!env.ABOGADO_WILSON_DB) {
        console.warn('D1 Database not available, using KV storage as fallback');
    }

    try {
        if (path === '/api/appointments' && request.method === 'GET') {
            // Use D1 database if available, otherwise use KV storage
            if (env.ABOGADO_WILSON_DB) {
                // Query using D1
                const { results } = await env.ABOGADO_WILSON_DB.prepare(
                    'SELECT * FROM appointments ORDER BY startTime ASC LIMIT 10'
                ).all();
                return new Response(JSON.stringify(results), {
                    headers: { 'Content-Type': 'application/json', ...standardHeaders }
                });
            } else {
                // Fallback to KV storage
                const appointments = await env.ABOGADO_WILSON_KV.get('appointments');
                const appointmentsArray = appointments ? JSON.parse(appointments) : [];
                return new Response(JSON.stringify(appointmentsArray), {
                    headers: { 'Content-Type': 'application/json', ...standardHeaders }
                });
            }
        }
        
        // Handle data service API endpoints
        if (path.startsWith('/api/data/') && request.method === 'GET') {
            const resource = path.split('/')[3]; // Extract resource name from /api/data/{resource}
            
            if (resource === 'searches') {
                // Handle searches - use D1 database if available, otherwise use KV storage
                if (env.ABOGADO_WILSON_DB) {
                    // Query using D1 - get recent searches
                    const { results } = await env.ABOGADO_WILSON_DB.prepare(
                        'SELECT * FROM searches ORDER BY timestamp DESC LIMIT 5'
                    ).all();
                    return new Response(JSON.stringify(results), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                } else {
                    // Fallback to KV storage
                    const searches = await env.ABOGADO_WILSON_KV.get('searches');
                    const searchesArray = searches ? JSON.parse(searches) : [];
                    
                    // Return the 5 most recent searches
                    const recentSearches = searchesArray.slice(0, 5);
                    
                    return new Response(JSON.stringify(recentSearches), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            } else if (resource === 'users' || resource === 'usuarios') {
                // Handle users - use D1 database if available
                if (env.ABOGADO_WILSON_DB) {
                    const { results } = await env.ABOGADO_WILSON_DB.prepare(
                        'SELECT * FROM usuarios LIMIT 50'
                    ).all();
                    return new Response(JSON.stringify(results), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                } else {
                    const users = await env.ABOGADO_WILSON_KV.get('usuarios');
                    const usersArray = users ? JSON.parse(users) : [];
                    return new Response(JSON.stringify(usersArray), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            } else if (resource === 'services' || resource === 'servicios') {
                // Handle services - use D1 database if available
                if (env.ABOGADO_WILSON_DB) {
                    const { results } = await env.ABOGADO_WILSON_DB.prepare(
                        'SELECT * FROM servicios LIMIT 50'
                    ).all();
                    return new Response(JSON.stringify(results), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                } else {
                    const services = await env.ABOGADO_WILSON_KV.get('servicios');
                    const servicesArray = services ? JSON.parse(services) : [];
                    return new Response(JSON.stringify(servicesArray), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            } else if (resource === 'ebooks') {
                // Handle ebooks - use D1 database if available
                if (env.ABOGADO_WILSON_DB) {
                    const { results } = await env.ABOGADO_WILSON_DB.prepare(
                        'SELECT * FROM ebooks LIMIT 50'
                    ).all();
                    return new Response(JSON.stringify(results), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                } else {
                    const ebooks = await env.ABOGADO_WILSON_KV.get('ebooks');
                    const ebooksArray = ebooks ? JSON.parse(ebooks) : [];
                    return new Response(JSON.stringify(ebooksArray), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            } else if (resource === 'citas') {
                // Handle appointments - use D1 database if available
                if (env.ABOGADO_WILSON_DB) {
                    const { results } = await env.ABOGADO_WILSON_DB.prepare(
                        'SELECT * FROM citas LIMIT 50'
                    ).all();
                    return new Response(JSON.stringify(results), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                } else {
                    const citas = await env.ABOGADO_WILSON_KV.get('citas');
                    const citasArray = citas ? JSON.parse(citas) : [];
                    return new Response(JSON.stringify(citasArray), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            }
            
            // Handle other resources with D1 or KV
            if (env.ABOGADO_WILSON_DB) {
                // Query using D1 database
                const { results } = await env.ABOGADO_WILSON_DB.prepare(
                    `SELECT * FROM ${resource} LIMIT 50`
                ).all();
                return new Response(JSON.stringify(results), {
                    headers: { 'Content-Type': 'application/json', ...standardHeaders }
                });
            } else {
                // Fallback to KV storage
                const data = await env.ABOGADO_WILSON_KV.get(resource);
                const dataArray = data ? JSON.parse(data) : [];
                return new Response(JSON.stringify(dataArray), {
                    headers: { 'Content-Type': 'application/json', ...standardHeaders }
                });
            }
        }
        
        // Handle POST requests to data service
        if (path.startsWith('/api/data/') && request.method === 'POST') {
            const resource = path.split('/')[3]; // Extract resource name from /api/data/{resource}
            
            if (resource === 'searches') {
                // Get the request body
                const body = await request.json();
                
                // Use D1 database if available, otherwise use KV storage
                if (env.ABOGADO_WILSON_DB) {
                    // Insert using D1 database
                    await env.ABOGADO_WILSON_DB.prepare(
                        'INSERT INTO searches (search_type, search_value, province, timestamp) VALUES (?, ?, ?, ?)'
                    ).bind(
                        body.search_type,
                        body.search_value,
                        body.province,
                        new Date().toISOString()
                    ).run();
                    
                    return new Response(JSON.stringify({ success: true, search: body }), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                } else {
                    // Fallback to KV storage
                    const existingSearches = await env.ABOGADO_WILSON_KV.get('searches');
                    const searchesArray = existingSearches ? JSON.parse(existingSearches) : [];
                    
                    // Add the new search to the beginning of the array
                    searchesArray.unshift({
                        ...body,
                        id: Date.now().toString(),
                        timestamp: new Date().toISOString()
                    });
                    
                    // Keep only the 50 most recent searches to prevent storage overflow
                    const limitedSearches = searchesArray.slice(0, 50);
                    
                    // Store back to KV
                    await env.ABOGADO_WILSON_KV.put('searches', JSON.stringify(limitedSearches));
                    
                    // Return the created search
                    return new Response(JSON.stringify({ success: true, search: body }), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            } else {
                // Handle other resources
                if (env.ABOGADO_WILSON_DB) {
                    // For other resources, we'll need to implement based on the specific table structure
                    const body = await request.json();
                    
                    // This is a generic insert - in real implementation you'd need to structure based on resource
                    // For now, we'll just store in KV as fallback
                    const existingData = await env.ABOGADO_WILSON_KV.get(resource);
                    const dataArray = existingData ? JSON.parse(existingData) : [];
                    
                    dataArray.push({
                        ...body,
                        id: Date.now().toString(),
                        timestamp: new Date().toISOString()
                    });
                    
                    await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(dataArray));
                    
                    return new Response(JSON.stringify({ success: true, data: body }), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                } else {
                    // Fallback to KV storage
                    const body = await request.json();
                    const existingData = await env.ABOGADO_WILSON_KV.get(resource);
                    const dataArray = existingData ? JSON.parse(existingData) : [];
                    
                    dataArray.push({
                        ...body,
                        id: Date.now().toString(),
                        timestamp: new Date().toISOString()
                    });
                    
                    await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(dataArray));
                    
                    return new Response(JSON.stringify({ success: true, data: body }), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            }
        }
        
        // Handle PUT requests to data service
        if (path.startsWith('/api/data/') && request.method === 'PUT') {
            const resource = path.split('/')[3]; // Extract resource name from /api/data/{resource}
            const id = path.split('/')[4]; // Extract ID from /api/data/{resource}/{id}
            
            if (env.ABOGADO_WILSON_DB) {
                // Update using D1 database
                const body = await request.json();
                
                // This is a simplified implementation - real implementation would build dynamic query
                // For now, we'll use KV as fallback
                const existingData = await env.ABOGADO_WILSON_KV.get(resource);
                const dataArray = existingData ? JSON.parse(existingData) : [];
                
                const itemIndex = dataArray.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    dataArray[itemIndex] = { ...dataArray[itemIndex], ...body };
                    await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(dataArray));
                    
                    return new Response(JSON.stringify({ success: true, data: dataArray[itemIndex] }), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            } else {
                // Fallback to KV storage
                const body = await request.json();
                const existingData = await env.ABOGADO_WILSON_KV.get(resource);
                const dataArray = existingData ? JSON.parse(existingData) : [];
                
                const itemIndex = dataArray.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    dataArray[itemIndex] = { ...dataArray[itemIndex], ...body };
                    await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(dataArray));
                    
                    return new Response(JSON.stringify({ success: true, data: dataArray[itemIndex] }), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            }
            
            return new Response(JSON.stringify({ error: 'Item not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json', ...standardHeaders }
            });
        }
        
        // Handle DELETE requests to data service
        if (path.startsWith('/api/data/') && request.method === 'DELETE') {
            const resource = path.split('/')[3]; // Extract resource name from /api/data/{resource}
            const id = path.split('/')[4]; // Extract ID from /api/data/{resource}/{id}
            
            if (env.ABOGADO_WILSON_DB) {
                // Delete using D1 database
                // For now, we'll use KV as fallback
                const existingData = await env.ABOGADO_WILSON_KV.get(resource);
                const dataArray = existingData ? JSON.parse(existingData) : [];
                
                const filteredArray = dataArray.filter(item => item.id !== id);
                await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(filteredArray));
                
                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json', ...standardHeaders }
                });
            } else {
                // Fallback to KV storage
                const existingData = await env.ABOGADO_WILSON_KV.get(resource);
                const dataArray = existingData ? JSON.parse(existingData) : [];
                
                const filteredArray = dataArray.filter(item => item.id !== id);
                await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(filteredArray));
                
                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json', ...standardHeaders }
                });
            }
        }
        
        // Handle newsletter subscription endpoint
        if (path.startsWith('/api/newsletter/') && request.method === 'POST') {
            if (path === '/api/newsletter/subscribe') {
                // Get the request body
                const body = await request.json();
                
                // Validate required fields
                if (!body.email) {
                    return new Response(JSON.stringify({ error: 'Email es requerido' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
                
                // Use D1 database if available, otherwise use KV storage
                if (env.ABOGADO_WILSON_DB) {
                    // Insert using D1 database
                    await env.ABOGADO_WILSON_DB.prepare(
                        'INSERT INTO usuarios (email, nombre, roles, creado_en) VALUES (?, ?, ?, ?)'
                    ).bind(
                        body.email,
                        body.name || 'Usuario Anónimo',
                        'suscriptor',
                        new Date().toISOString()
                    ).run();
                    
                    return new Response(JSON.stringify({ success: true, message: '¡Gracias por suscribirte!' }), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                } else {
                    // Fallback to KV storage
                    const existingSubscribers = await env.ABOGADO_WILSON_KV.get('newsletter_subscribers');
                    const subscribersArray = existingSubscribers ? JSON.parse(existingSubscribers) : [];
                    
                    // Check if email already exists
                    const emailExists = subscribersArray.some(subscriber => subscriber.email === body.email);
                    if (emailExists) {
                        return new Response(JSON.stringify({ error: 'Email ya está suscrito' }), {
                            status: 400,
                            headers: { 'Content-Type': 'application/json', ...standardHeaders }
                        });
                    }
                    
                    // Add the new subscriber
                    subscribersArray.push({
                        ...body,
                        id: Date.now().toString(),
                        timestamp: new Date().toISOString()
                    });
                    
                    // Store back to KV
                    await env.ABOGADO_WILSON_KV.put('newsletter_subscribers', JSON.stringify(subscribersArray));
                    
                    // Return success
                    return new Response(JSON.stringify({ success: true, message: '¡Gracias por suscribirte!' }), {
                        headers: { 'Content-Type': 'application/json', ...standardHeaders }
                    });
                }
            }
        }

        // Handle Auth endpoints (placeholder)
        if (path === '/api/auth/register' && request.method === 'POST') {
            const body = await request.json();
            console.log('Simulating registration for:', body.email);
            
            const fakeUser = { id: `user_${Date.now()}`, email: body.email, name: body.name, roles: ['client'] };
            const fakeToken = `fake-token-${Date.now()}`;

            return new Response(JSON.stringify({ 
                success: true, 
                message: 'Registro simulado exitoso',
                user: fakeUser,
                token: fakeToken
            }), {
                headers: { 'Content-Type': 'application/json', ...standardHeaders }
            });
        }

        if (path === '/api/auth/login' && request.method === 'POST') {
            const body = await request.json();
            console.log('Simulating login for:', body.email);

            const fakeUser = { id: `user_${Date.now()}`, email: body.email, name: 'Usuario de Prueba', roles: ['client'] };
            const fakeToken = `fake-token-${Date.now()}`;

            return new Response(JSON.stringify({ 
                success: true, 
                message: 'Inicio de sesión simulado exitoso',
                user: fakeUser,
                token: fakeToken
            }), {
                headers: { 'Content-Type': 'application/json', ...standardHeaders }
            });
        }

        // --- Add other API routes here ---

        // Handle purchase endpoint (placeholder)
        if (path === '/api/purchase' && request.method === 'POST') {
            const body = await request.json();
            console.log('Simulating purchase for:', body);

            // In a real application, you would:
            // 1. Verify the user's authentication (JWT, session, etc.)
            // 2. Get the item details (price, etc.) from your database to prevent tampering.
            // 3. Process payment with Stripe, PayPal, etc.
            // 4. If payment is successful, grant access to the item (update database).
            
            return new Response(JSON.stringify({ 
                success: true, 
                message: 'Compra simulada exitosamente',
                transactionId: `sim_${Date.now()}` 
            }), {
                headers: { 'Content-Type': 'application/json', ...standardHeaders }
            });
        }

        // Fallback for unknown API routes
        return new Response(JSON.stringify({ error: 'Not Found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...standardHeaders }
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...standardHeaders }
        });
    }
}


/**
 * Renderiza la página de mantenimiento en caso de problemas
 */
function renderMaintenancePage(env) {
  // Asegurar que ENV esté inicializado
  const config = ENV || initEnv(env);
  
  const html = `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estamos en mantenimiento - Abogado Wilson</title>
    <style>
      body { font-family: system-ui, sans-serif; line-height: 1.5; margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
      .header { color: #2563eb; }
      .message { background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 1rem; }
      .contact { margin-top: 2rem; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="header">Abogado Wilson</h1>
      <div class="message">
        <p>Estamos realizando mejoras en nuestro sitio. Por favor, inténtelo de nuevo en unos minutos.</p>
      </div>
      <div class="contact">
        <p>Para consultas inmediatas:</p>
        <ul>
          <li>Email: ${config.CONTACT_EMAIL}</li>
          <li>WhatsApp: ${config.WHATSAPP_NUMBER}</li>
        </ul>
      </div>
    </div>
  </body>
  </html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8'
    }
  });
}

/**
 * Maneja las solicitudes a recursos estáticos
 */
async function handleStaticRequest(request, url) {
  // Verificar si es una solicitud de favicon
  if (url.pathname === '/favicon.ico') {
    // Servir el favicon desde la carpeta /dist/favicon.ico
    try {
      return fetch(request);
    } catch (error) {
      console.error('Error al servir favicon:', error);
      // Fallback - responder con una imagen vacía
      return new Response(null, {
        status: 204
      });
    }
  }

  // Intentar servir el archivo estático
  try {
    return fetch(request);
  } catch (error) {
    console.error('Error al servir archivo estático:', error);
    return new Response('Recurso no encontrado', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * Función principal del worker para manejar solicitudes
 */
export default {
  async fetch(request, env, ctx) {
    // Define CORS headers in one place
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // O un origen específico para más seguridad
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info',
      'Access-Control-Max-Age': '86400', // Cache preflight requests for a day
    };

    // Handle CORS preflight requests (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    let response;
    try {
      // Initialize environment variables
      ENV = initEnv(env);

      const url = new URL(request.url);

      // Initialize database tables if using D1
      if (env.ABOGADO_WILSON_DB && !global.dbInitialized) {
        try {
          // Create searches table if it doesn't exist
          await env.ABOGADO_WILSON_DB.prepare(
            `CREATE TABLE IF NOT EXISTS searches (
              id TEXT PRIMARY KEY,
              search_type TEXT NOT NULL,
              search_value TEXT NOT NULL,
              province TEXT NOT NULL,
              timestamp TEXT NOT NULL
            )`
          ).run();
          
          // Create usuarios table if it doesn't exist (for newsletter subscribers)
          await env.ABOGADO_WILSON_DB.prepare(
            `CREATE TABLE IF NOT EXISTS usuarios (
              id TEXT PRIMARY KEY,
              email TEXT UNIQUE NOT NULL,
              nombre TEXT NOT NULL,
              roles TEXT DEFAULT 'cliente',
              activo INTEGER DEFAULT 1,
              creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
              ultima_sesion DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
          ).run();
          
          global.dbInitialized = true;
          console.log('Database tables initialized');
        } catch (initError) {
          console.error('Error initializing database tables:', initError);
        }
      }

      // Route API requests
      if (url.pathname.startsWith('/api/')) {
        response = await handleApiRequest(request, env);
      } 
      // Handle static assets using Cloudflare Pages default behavior
      else {
        response = await env.ASSETS.fetch(request);
      }
    } catch (error) {
      console.error('Critical Worker Error:', error);
      // Create a generic error response if something unexpected happens
      response = new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Clone the response to make it mutable
    const mutableResponse = new Response(response.body, response);

    // Apply CORS headers to every single response
    Object.entries(corsHeaders).forEach(([key, value]) => {
      mutableResponse.headers.set(key, value);
    });

    return mutableResponse;
  },
};
