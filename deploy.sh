#!/bin/bash

# ===============================================
# DEPLOYMENT AUTOMÁTICO - ABOGADOS WILSON
# Ejecutar: chmod +x deploy.sh && ./deploy.sh
# ===============================================

echo "🚀 Iniciando deployment automático..."

# 1. Limpiar submodules problemáticos
echo "🧹 Limpiando submodules..."
rm -rf .git/modules 2>/dev/null || echo "No hay submodules para limpiar"

# 2. Verificar estado de Git
echo "📋 Verificando estado de Git..."
git status --porcelain
if [ $? -ne 0 ]; then
    echo "❌ Error con Git. Verifica tu repositorio."
    exit 1
fi

# 3. Build para producción
echo "🔨 Construyendo aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build. Revisa los errores."
    exit 1
fi

echo "✅ Build exitoso"

# 4. Verificar que existe dist/
if [ ! -d "dist" ]; then
    echo "❌ Carpeta dist/ no encontrada"
    exit 1
fi

# 5. Verificar variables de entorno
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "⚠️  Variables de entorno no configuradas"
    echo "   Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY"
    echo "   Puedes hacerlo en el dashboard de tu plataforma de deployment"
fi

# 6. Agregar cambios a Git
echo "📈 Agregando cambios a Git..."
git add .

# 7. Commit de cambios
echo "📋 Realizando commit..."
git commit -m "Commit origin: Cloudflare ready, no errors"

# 8. Subir cambios a GitHub
echo "🚀 Subiendo cambios a GitHub..."
git push origin main

# 9. Desplegar en Cloudflare
echo "🌐 Desplegando en Cloudflare..."
wrangler deploy

echo "✅ Deployment automático completado"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Sube el código a GitHub (si no lo has hecho)"
echo "   2. Conecta a Netlify/Vercel/Cloudflare Pages"
echo "   3. Configura variables de entorno"
echo "   4. ¡Tu aplicación estará en vivo!"
echo ""
echo "🎉 ¡Sistema listo para producción!"