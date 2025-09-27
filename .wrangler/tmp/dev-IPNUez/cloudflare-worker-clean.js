var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// cloudflare-worker-clean.js
function getEnvVariable(env, name, defaultValue) {
  return env && env[name] !== void 0 ? env[name] : defaultValue;
}
__name(getEnvVariable, "getEnvVariable");
var ENV = null;
function initEnv(env) {
  return {
    SUPABASE_URL: getEnvVariable(env, "SUPABASE_URL", ""),
    SUPABASE_KEY: getEnvVariable(env, "SUPABASE_KEY", ""),
    ENVIRONMENT: getEnvVariable(env, "ENVIRONMENT", "development"),
    // Default to development for local
    API_ENABLED: getEnvVariable(env, "API_ENABLED", "true") === "true",
    CORS_ORIGIN: getEnvVariable(env, "CORS_ORIGIN", "*"),
    WHATSAPP_NUMBER: getEnvVariable(env, "WHATSAPP_NUMBER", "+59398835269"),
    N8N_WEBHOOK_URL: getEnvVariable(env, "N8N_WEBHOOK_URL", "https://n8nom.onrender.com/webhook/1cfd2baa-f5ec-4bc4-a99d-dfb36793eabd"),
    CONTACT_EMAIL: getEnvVariable(env, "CONTACT_EMAIL", "Wifirmalegal@gmail.com")
  };
}
__name(initEnv, "initEnv");
var standardHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Cache-Control": "no-cache",
  // No cache for API
  "X-Content-Type-Options": "nosniff"
};
async function handleApiRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (!env.ABOGADO_WILSON_DB) {
    console.warn("D1 Database not available, using KV storage as fallback");
  }
  try {
    if (path === "/api/appointments" && request.method === "GET") {
      if (env.ABOGADO_WILSON_DB) {
        const { results } = await env.ABOGADO_WILSON_DB.prepare(
          "SELECT * FROM appointments ORDER BY startTime ASC LIMIT 10"
        ).all();
        return new Response(JSON.stringify(results), {
          headers: { "Content-Type": "application/json", ...standardHeaders }
        });
      } else {
        const appointments = await env.ABOGADO_WILSON_KV.get("appointments");
        const appointmentsArray = appointments ? JSON.parse(appointments) : [];
        return new Response(JSON.stringify(appointmentsArray), {
          headers: { "Content-Type": "application/json", ...standardHeaders }
        });
      }
    }
    if (path.startsWith("/api/data/") && request.method === "GET") {
      const resource = path.split("/")[3];
      if (resource === "searches") {
        if (env.ABOGADO_WILSON_DB) {
          const { results } = await env.ABOGADO_WILSON_DB.prepare(
            "SELECT * FROM searches ORDER BY timestamp DESC LIMIT 5"
          ).all();
          return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        } else {
          const searches = await env.ABOGADO_WILSON_KV.get("searches");
          const searchesArray = searches ? JSON.parse(searches) : [];
          const recentSearches = searchesArray.slice(0, 5);
          return new Response(JSON.stringify(recentSearches), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      } else if (resource === "users" || resource === "usuarios") {
        if (env.ABOGADO_WILSON_DB) {
          const { results } = await env.ABOGADO_WILSON_DB.prepare(
            "SELECT * FROM usuarios LIMIT 50"
          ).all();
          return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        } else {
          const users = await env.ABOGADO_WILSON_KV.get("usuarios");
          const usersArray = users ? JSON.parse(users) : [];
          return new Response(JSON.stringify(usersArray), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      } else if (resource === "services" || resource === "servicios") {
        if (env.ABOGADO_WILSON_DB) {
          const { results } = await env.ABOGADO_WILSON_DB.prepare(
            "SELECT * FROM servicios LIMIT 50"
          ).all();
          return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        } else {
          const services = await env.ABOGADO_WILSON_KV.get("servicios");
          const servicesArray = services ? JSON.parse(services) : [];
          return new Response(JSON.stringify(servicesArray), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      } else if (resource === "ebooks") {
        if (env.ABOGADO_WILSON_DB) {
          const { results } = await env.ABOGADO_WILSON_DB.prepare(
            "SELECT * FROM ebooks LIMIT 50"
          ).all();
          return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        } else {
          const ebooks = await env.ABOGADO_WILSON_KV.get("ebooks");
          const ebooksArray = ebooks ? JSON.parse(ebooks) : [];
          return new Response(JSON.stringify(ebooksArray), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      } else if (resource === "citas") {
        if (env.ABOGADO_WILSON_DB) {
          const { results } = await env.ABOGADO_WILSON_DB.prepare(
            "SELECT * FROM citas LIMIT 50"
          ).all();
          return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        } else {
          const citas = await env.ABOGADO_WILSON_KV.get("citas");
          const citasArray = citas ? JSON.parse(citas) : [];
          return new Response(JSON.stringify(citasArray), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      }
      if (env.ABOGADO_WILSON_DB) {
        const { results } = await env.ABOGADO_WILSON_DB.prepare(
          `SELECT * FROM ${resource} LIMIT 50`
        ).all();
        return new Response(JSON.stringify(results), {
          headers: { "Content-Type": "application/json", ...standardHeaders }
        });
      } else {
        const data = await env.ABOGADO_WILSON_KV.get(resource);
        const dataArray = data ? JSON.parse(data) : [];
        return new Response(JSON.stringify(dataArray), {
          headers: { "Content-Type": "application/json", ...standardHeaders }
        });
      }
    }
    if (path.startsWith("/api/data/") && request.method === "POST") {
      const resource = path.split("/")[3];
      if (resource === "searches") {
        const body = await request.json();
        if (env.ABOGADO_WILSON_DB) {
          await env.ABOGADO_WILSON_DB.prepare(
            "INSERT INTO searches (search_type, search_value, province, timestamp) VALUES (?, ?, ?, ?)"
          ).bind(
            body.search_type,
            body.search_value,
            body.province,
            (/* @__PURE__ */ new Date()).toISOString()
          ).run();
          return new Response(JSON.stringify({ success: true, search: body }), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        } else {
          const existingSearches = await env.ABOGADO_WILSON_KV.get("searches");
          const searchesArray = existingSearches ? JSON.parse(existingSearches) : [];
          searchesArray.unshift({
            ...body,
            id: Date.now().toString(),
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          const limitedSearches = searchesArray.slice(0, 50);
          await env.ABOGADO_WILSON_KV.put("searches", JSON.stringify(limitedSearches));
          return new Response(JSON.stringify({ success: true, search: body }), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      } else {
        if (env.ABOGADO_WILSON_DB) {
          const body = await request.json();
          const existingData = await env.ABOGADO_WILSON_KV.get(resource);
          const dataArray = existingData ? JSON.parse(existingData) : [];
          dataArray.push({
            ...body,
            id: Date.now().toString(),
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(dataArray));
          return new Response(JSON.stringify({ success: true, data: body }), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        } else {
          const body = await request.json();
          const existingData = await env.ABOGADO_WILSON_KV.get(resource);
          const dataArray = existingData ? JSON.parse(existingData) : [];
          dataArray.push({
            ...body,
            id: Date.now().toString(),
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(dataArray));
          return new Response(JSON.stringify({ success: true, data: body }), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      }
    }
    if (path.startsWith("/api/data/") && request.method === "PUT") {
      const resource = path.split("/")[3];
      const id = path.split("/")[4];
      if (env.ABOGADO_WILSON_DB) {
        const body = await request.json();
        const existingData = await env.ABOGADO_WILSON_KV.get(resource);
        const dataArray = existingData ? JSON.parse(existingData) : [];
        const itemIndex = dataArray.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          dataArray[itemIndex] = { ...dataArray[itemIndex], ...body };
          await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(dataArray));
          return new Response(JSON.stringify({ success: true, data: dataArray[itemIndex] }), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      } else {
        const body = await request.json();
        const existingData = await env.ABOGADO_WILSON_KV.get(resource);
        const dataArray = existingData ? JSON.parse(existingData) : [];
        const itemIndex = dataArray.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          dataArray[itemIndex] = { ...dataArray[itemIndex], ...body };
          await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(dataArray));
          return new Response(JSON.stringify({ success: true, data: dataArray[itemIndex] }), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      }
      return new Response(JSON.stringify({ error: "Item not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...standardHeaders }
      });
    }
    if (path.startsWith("/api/data/") && request.method === "DELETE") {
      const resource = path.split("/")[3];
      const id = path.split("/")[4];
      if (env.ABOGADO_WILSON_DB) {
        const existingData = await env.ABOGADO_WILSON_KV.get(resource);
        const dataArray = existingData ? JSON.parse(existingData) : [];
        const filteredArray = dataArray.filter((item) => item.id !== id);
        await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(filteredArray));
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json", ...standardHeaders }
        });
      } else {
        const existingData = await env.ABOGADO_WILSON_KV.get(resource);
        const dataArray = existingData ? JSON.parse(existingData) : [];
        const filteredArray = dataArray.filter((item) => item.id !== id);
        await env.ABOGADO_WILSON_KV.put(resource, JSON.stringify(filteredArray));
        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json", ...standardHeaders }
        });
      }
    }
    if (path.startsWith("/api/newsletter/") && request.method === "POST") {
      if (path === "/api/newsletter/subscribe") {
        const body = await request.json();
        if (!body.email) {
          return new Response(JSON.stringify({ error: "Email es requerido" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
        if (env.ABOGADO_WILSON_DB) {
          await env.ABOGADO_WILSON_DB.prepare(
            "INSERT INTO usuarios (email, nombre, roles, creado_en) VALUES (?, ?, ?, ?)"
          ).bind(
            body.email,
            body.name || "Usuario An\xF3nimo",
            "suscriptor",
            (/* @__PURE__ */ new Date()).toISOString()
          ).run();
          return new Response(JSON.stringify({ success: true, message: "\xA1Gracias por suscribirte!" }), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        } else {
          const existingSubscribers = await env.ABOGADO_WILSON_KV.get("newsletter_subscribers");
          const subscribersArray = existingSubscribers ? JSON.parse(existingSubscribers) : [];
          const emailExists = subscribersArray.some((subscriber) => subscriber.email === body.email);
          if (emailExists) {
            return new Response(JSON.stringify({ error: "Email ya est\xE1 suscrito" }), {
              status: 400,
              headers: { "Content-Type": "application/json", ...standardHeaders }
            });
          }
          subscribersArray.push({
            ...body,
            id: Date.now().toString(),
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          await env.ABOGADO_WILSON_KV.put("newsletter_subscribers", JSON.stringify(subscribersArray));
          return new Response(JSON.stringify({ success: true, message: "\xA1Gracias por suscribirte!" }), {
            headers: { "Content-Type": "application/json", ...standardHeaders }
          });
        }
      }
    }
    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...standardHeaders }
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...standardHeaders }
    });
  }
}
__name(handleApiRequest, "handleApiRequest");
var cloudflare_worker_clean_default = {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      // O un origen específico para más seguridad
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info",
      "Access-Control-Max-Age": "86400"
      // Cache preflight requests for a day
    };
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }
    let response;
    try {
      ENV = initEnv(env);
      const url = new URL(request.url);
      if (env.ABOGADO_WILSON_DB && !global.dbInitialized) {
        try {
          await env.ABOGADO_WILSON_DB.prepare(
            `CREATE TABLE IF NOT EXISTS searches (
              id TEXT PRIMARY KEY,
              search_type TEXT NOT NULL,
              search_value TEXT NOT NULL,
              province TEXT NOT NULL,
              timestamp TEXT NOT NULL
            )`
          ).run();
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
          console.log("Database tables initialized");
        } catch (initError) {
          console.error("Error initializing database tables:", initError);
        }
      }
      if (url.pathname.startsWith("/api/")) {
        response = await handleApiRequest(request, env);
      } else {
        response = await env.ASSETS.fetch(request);
      }
    } catch (error) {
      console.error("Critical Worker Error:", error);
      response = new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const mutableResponse = new Response(response.body, response);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      mutableResponse.headers.set(key, value);
    });
    return mutableResponse;
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-BmlHMF/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = cloudflare_worker_clean_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-BmlHMF/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=cloudflare-worker-clean.js.map
