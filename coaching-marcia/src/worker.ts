import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export interface Env {
    COACHING_DATA: KVNamespace;
    ENVIRONMENT: string;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);

        // Handle API routes
        if (url.pathname.startsWith('/api/')) {
            return handleApiRequest(request, env);
        }

        // Handle static assets
        try {
            const asset = await getAssetFromKV(
                {
                    request,
                    waitUntil: ctx.waitUntil,
                },
                {
                    cacheControl: {
                        browserTTL: 60 * 60 * 24 * 7, // 7 days
                        edgeTTL: 60 * 60 * 24 * 30, // 30 days
                    },
                }
            );

            return new Response(asset.body, {
                headers: {
                    'Content-Type': asset.headers.get('Content-Type') || 'text/plain',
                    'Cache-Control': 'public, max-age=31536000',
                },
            });
        } catch (e) {
            // If asset not found, serve index.html for SPA routing
            if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/static/')) {
                return new Response('Not Found', { status: 404 });
            }

            // Serve index.html for client-side routing
            try {
                const indexAsset = await getAssetFromKV(
                    {
                        request: new Request(`${url.origin}/index.html`),
                        waitUntil: ctx.waitUntil,
                    },
                    {
                        cacheControl: {
                            browserTTL: 60 * 60 * 24, // 1 day
                            edgeTTL: 60 * 60 * 24 * 7, // 7 days
                        },
                    }
                );

                return new Response(indexAsset.body, {
                    headers: {
                        'Content-Type': 'text/html',
                        'Cache-Control': 'public, max-age=0, must-revalidate',
                    },
                });
            } catch (e) {
                return new Response('Not Found', { status: 404 });
            }
        }
    },
};

async function handleApiRequest(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: corsHeaders,
        });
    }

    try {
        // Handle different API endpoints
        if (path === '/api/health') {
            return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        if (path === '/api/courses') {
            if (request.method === 'GET') {
                const courses = await env.COACHING_DATA.get('courses', 'json');
                return new Response(JSON.stringify(courses || []), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                });
            }
        }

        if (path === '/api/contact') {
            if (request.method === 'POST') {
                const body = await request.json();
                // Store contact form data
                await env.COACHING_DATA.put(`contact-${Date.now()}`, JSON.stringify(body));
                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                });
            }
        }

        if (path === '/api/newsletter') {
            if (request.method === 'POST') {
                const body = await request.json();
                // Store newsletter subscription
                await env.COACHING_DATA.put(`newsletter-${Date.now()}`, JSON.stringify(body));
                return new Response(JSON.stringify({ success: true }), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                });
            }
        }

        // Default 404 for API routes
        return new Response(JSON.stringify({ error: 'Not Found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    }
}
