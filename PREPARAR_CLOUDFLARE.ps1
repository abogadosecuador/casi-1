# ===============================================
# PREPARACIÓN PARA CLOUDFLARE WORKERS - SIN SUBMODULES
# Script específico para evitar problemas de submodules
# ===============================================

Write-Host "🚀 PREPARANDO PROYECTO PARA CLOUDFLARE..." -ForegroundColor Green

# 1. Eliminar completamente cualquier rastro de submodules
Write-Host "🗑️  Eliminando submodules problemáticos..." -ForegroundColor Yellow
if (Test-Path ".git\modules") {
    Remove-Item -Recurse -Force ".git\modules"
}
if (Test-Path ".gitmodules") {
    Remove-Item -Force ".gitmodules"
}

# 2. Reset completo del repositorio
Write-Host "🔄 Limpiando estado de Git..." -ForegroundColor Yellow
git reset --hard HEAD
git clean -fd

# 3. Crear archivos de configuración para Cloudflare
Write-Host "⚙️  Creando configuración para Cloudflare..." -ForegroundColor Yellow

# _headers para seguridad
$headersContent = @"
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
"@
Set-Content -Path "_headers" -Value $headersContent

# _routes.json para enrutamiento
$routesContent = @"
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/api/*"]
}
"@
Set-Content -Path "_routes.json" -Value $routesContent

Write-Host "✅ Archivos de configuración creados" -ForegroundColor Green

# 4. Build para producción
Write-Host "🔨 Construyendo aplicación..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build exitoso" -ForegroundColor Green

# 5. Verificar que existe dist/
if (-not (Test-Path "dist")) {
    Write-Host "❌ Carpeta dist/ no encontrada" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Carpeta dist/ verificada" -ForegroundColor Green

# 6. Preparar commit limpio
Write-Host "📝 Preparando commit limpio..." -ForegroundColor Yellow
git add .
try {
    git commit -m "Clean build: removed submodules, ready for Cloudflare Workers"
    Write-Host "✅ Commit exitoso" -ForegroundColor Green
} catch {
    Write-Host "ℹ️  No hay cambios para commitear" -ForegroundColor Blue
}

# 7. Subir a GitHub
Write-Host "🚀 Subiendo a GitHub..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "✅ Push exitoso" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Error en push (verifica remote)" -ForegroundColor Yellow
}

Write-Host "" -ForegroundColor Green
Write-Host "🎉 ¡PROYECTO LISTO PARA CLOUDFLARE WORKERS!" -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host "📋 PRÓXIMOS PASOS EN CLOUDFLARE:" -ForegroundColor Cyan
Write-Host "   1. Ve a Workers & Pages" -ForegroundColor White
Write-Host "   2. Crea nueva aplicación Pages" -ForegroundColor White
Write-Host "   3. Conecta repositorio GitHub" -ForegroundColor White
Write-Host "   4. Configura variables de entorno:" -ForegroundColor White
Write-Host "      VITE_SUPABASE_URL=https://kbybhgxqdefuquybstqk.supabase.co" -ForegroundColor Yellow
Write-Host "      VITE_SUPABASE_ANON_KEY=tu_clave_anonima" -ForegroundColor Yellow
Write-Host "   5. Deploy automático ✅" -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host "🚀 ¡Tu aplicación estará en vivo en minutos!" -ForegroundColor Green
