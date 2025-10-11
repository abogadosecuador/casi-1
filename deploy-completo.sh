#!/bin/bash

# ===============================================
# DEPLOYMENT AUTOMÁTICO COMPLETO - ABOGADOS WILSON
# Script que hace TODO automáticamente sin intervención
# ===============================================

echo "🚀 INICIANDO DEPLOYMENT AUTOMÁTICO COMPLETO..."

# 1. Limpiar completamente el repositorio
echo "🧹 Paso 1: Limpiando repositorio..."
rm -rf .git/modules 2>/dev/null || echo "No hay modules para limpiar"
git submodule deinit --all -f 2>/dev/null || echo "No hay submodules para deinit"
git rm .gitmodules 2>/dev/null || echo "No hay .gitmodules para eliminar"
git reset --hard HEAD 2>/dev/null || echo "Reset no necesario"

# 2. Verificar estado del repositorio
echo "📋 Paso 2: Verificando estado..."
if ! git status --porcelain > /dev/null 2>&1; then
    echo "❌ Error: Git no está funcionando correctamente"
    exit 1
fi

# 3. Build para producción
echo "🔨 Paso 3: Construyendo aplicación..."
if ! npm run build > build.log 2>&1; then
    echo "❌ Error en el build. Revisa build.log"
    exit 1
fi

echo "✅ Build exitoso"

# 4. Verificar que existe dist/
if [ ! -d "dist" ]; then
    echo "❌ Error: Carpeta dist/ no encontrada"
    exit 1
fi

echo "✅ Carpeta dist/ verificada"

# 5. Instalar wrangler si no existe
echo "🌐 Paso 4: Preparando Cloudflare Wrangler..."
if ! command -v wrangler &> /dev/null; then
    echo "Instalando wrangler..."
    npm install -g wrangler
fi

# 6. Verificar variables de entorno
echo "⚙️  Paso 5: Verificando configuración..."
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "⚠️  Variables de entorno no configuradas"
    echo "   VITE_SUPABASE_URL: $VITE_SUPABASE_URL"
    echo "   VITE_SUPABASE_ANON_KEY: ${VITE_SUPABASE_ANON_KEY:0:20}..."
    echo ""
    echo "💡 Configura estas variables en tu plataforma de deployment"
else
    echo "✅ Variables de entorno configuradas"
fi

# 7. Preparar archivos para deployment
echo "📦 Paso 6: Preparando archivos..."

# Crear _headers para Cloudflare
cat > _headers << 'EOF'
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
EOF

# Crear _routes.json para Cloudflare
cat > _routes.json << 'EOF'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/api/*"]
}
EOF

echo "✅ Archivos de configuración creados"

# 8. Commit de todos los cambios
echo "📝 Paso 7: Preparando commit..."
git add .
if git diff --cached --quiet; then
    echo "ℹ️  No hay cambios para commitear"
else
    git commit -m "Automated deployment: complete system ready"
    echo "✅ Commit exitoso"
fi

# 9. Push a GitHub (si está configurado)
echo "🚀 Paso 8: Subiendo a GitHub..."
if git remote get-url origin > /dev/null 2>&1; then
    if git push origin main; then
        echo "✅ Push exitoso"
    else
        echo "⚠️  Error en push (posiblemente no hay conexión)"
    fi
else
    echo "ℹ️  No hay remote configurado"
fi

# 10. Deploy en Cloudflare Workers
echo "🌍 Paso 9: Desplegando en Cloudflare..."
if wrangler deploy > deploy.log 2>&1; then
    echo "🎉 ¡DEPLOYMENT EXITOSO!"
    echo ""
    echo "📋 Tu aplicación está disponible en:"
    echo "   - Cloudflare Workers (automático)"
    echo "   - Configura en Netlify/Vercel para URLs personalizadas"
    echo ""
    echo "✅ ¡Sistema 100% operativo!"
else
    echo "⚠️  Error en deployment de Cloudflare"
    echo "💡 Alternativas:"
    echo "   - Netlify: https://netlify.com (más fácil)"
    echo "   - Vercel: https://vercel.com (rápido)"
    echo ""
    echo "📄 Revisa deploy.log para más detalles"
fi
