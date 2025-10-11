#!/bin/bash

# ===============================================
# DEPLOYMENT LIMPIO - ABOGADOS WILSON
# Sin submodules problemáticos
# ===============================================

echo "🚀 Iniciando deployment limpio..."

# 1. Verificar que no hay submodules
echo "🔍 Verificando submodules..."
if [ -d ".git/modules" ]; then
    echo "🗑️  Eliminando submodules problemáticos..."
    rm -rf .git/modules
    git rm -r --cached . 2>/dev/null || true
    echo "✅ Submodules eliminados"
else
    echo "✅ No hay submodules problemáticos"
fi

# 2. Build para producción
echo "🔨 Construyendo aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build"
    exit 1
fi

echo "✅ Build exitoso"

# 3. Verificar que existe dist/
if [ ! -d "dist" ]; then
    echo "❌ Carpeta dist/ no encontrada"
    exit 1
fi

echo "✅ Carpeta dist/ verificada"

# 4. Configurar para Cloudflare Workers
echo "🌐 Configurando para Cloudflare Workers..."

# Verificar si wrangler está instalado
if ! command -v wrangler &> /dev/null; then
    echo "⚠️  Wrangler no está instalado. Instalando..."
    npm install -g wrangler
fi

# 5. Hacer commit de cambios limpios
echo "📝 Preparando commit limpio..."
git add .
git commit -m "Clean deployment: removed problematic submodules"

if [ $? -eq 0 ]; then
    echo "✅ Commit exitoso"
else
    echo "ℹ️  No hay cambios para commitear"
fi

# 6. Subir a GitHub
echo "🚀 Subiendo a GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    echo "⚠️  No se pudo subir a GitHub (posiblemente no hay remote configurado)"
    echo "   Puedes subir manualmente: git push origin main"
fi

# 7. Deploy en Cloudflare
echo "🌍 Desplegando en Cloudflare Workers..."
wrangler deploy

if [ $? -eq 0 ]; then
    echo "🎉 ¡Deployment exitoso!"
    echo ""
    echo "📋 Tu aplicación está disponible en:"
    echo "   - Cloudflare Workers (automático)"
    echo "   - O configura en Netlify/Vercel para URLs personalizadas"
    echo ""
    echo "✅ ¡Sistema listo para producción!"
else
    echo "⚠️  Error en el deployment de Cloudflare"
    echo "   Alternativas:"
    echo "   - Usa Netlify: https://netlify.com"
    echo "   - Usa Vercel: https://vercel.com"
    echo "   - Configura manualmente en Cloudflare Dashboard"
fi
