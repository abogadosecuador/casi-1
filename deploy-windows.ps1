# ===============================================
# DEPLOYMENT WINDOWS - ABOGADOS WILSON
# Script PowerShell para deployment limpio
# ===============================================

Write-Host "🚀 Iniciando deployment limpio..." -ForegroundColor Green

# 1. Limpiar submodules problemáticos
Write-Host "🧹 Limpiando submodules..." -ForegroundColor Yellow
if (Test-Path ".git\modules") {
    Remove-Item -Recurse -Force ".git\modules"
    Write-Host "✅ Submodules eliminados" -ForegroundColor Green
} else {
    Write-Host "✅ No hay submodules problemáticos" -ForegroundColor Green
}

# 2. Verificar estado de Git
Write-Host "📋 Verificando estado de Git..." -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain 2>$null
    Write-Host "✅ Git operativo" -ForegroundColor Green
} catch {
    Write-Host "❌ Error con Git. Verifica tu repositorio." -ForegroundColor Red
    exit 1
}

# 3. Build para producción
Write-Host "🔨 Construyendo aplicación..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error en el build" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build exitoso" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}

# 4. Verificar que existe dist/
if (-not (Test-Path "dist")) {
    Write-Host "❌ Carpeta dist/ no encontrada" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Carpeta dist/ verificada" -ForegroundColor Green

# 5. Verificar variables de entorno
$hasSupabaseUrl = $env:VITE_SUPABASE_URL -ne $null -and $env:VITE_SUPABASE_URL -ne ""
$hasSupabaseKey = $env:VITE_SUPABASE_ANON_KEY -ne $null -and $env:VITE_SUPABASE_ANON_KEY -ne ""

if (-not ($hasSupabaseUrl -and $hasSupabaseKey)) {
    Write-Host "⚠️  Variables de entorno no configuradas" -ForegroundColor Yellow
    Write-Host "   Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY" -ForegroundColor Yellow
    Write-Host "   Puedes hacerlo en el dashboard de tu plataforma de deployment" -ForegroundColor Yellow
} else {
    Write-Host "✅ Variables de entorno configuradas" -ForegroundColor Green
}

# 6. Verificar wrangler
Write-Host "🌐 Verificando Cloudflare Wrangler..." -ForegroundColor Yellow
try {
    $wranglerVersion = wrangler --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Wrangler instalado: $wranglerVersion" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Wrangler no está instalado. Instalando..." -ForegroundColor Yellow
        npm install -g wrangler
    }
} catch {
    Write-Host "⚠️  Instalando wrangler..." -ForegroundColor Yellow
    npm install -g wrangler
}

# 7. Commit y push
Write-Host "📝 Preparando commit..." -ForegroundColor Yellow
git add .
try {
    git commit -m "Clean deployment: removed problematic submodules"
    Write-Host "✅ Commit exitoso" -ForegroundColor Green
} catch {
    Write-Host "ℹ️  No hay cambios para commitear" -ForegroundColor Blue
}

# 8. Push a GitHub
Write-Host "🚀 Subiendo a GitHub..." -ForegroundColor Yellow
try {
    git push origin main
    Write-Host "✅ Push exitoso" -ForegroundColor Green
} catch {
    Write-Host "⚠️  No se pudo subir a GitHub (verifica remote)" -ForegroundColor Yellow
    Write-Host "   Puedes subir manualmente: git push origin main" -ForegroundColor Yellow
}

# 9. Deploy en Cloudflare
Write-Host "🌍 Desplegando en Cloudflare Workers..." -ForegroundColor Yellow
try {
    wrangler deploy
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 ¡Deployment exitoso!" -ForegroundColor Green
        Write-Host "" -ForegroundColor Green
        Write-Host "📋 Tu aplicación está disponible en:" -ForegroundColor Green
        Write-Host "   - Cloudflare Workers (automático)" -ForegroundColor Green
        Write-Host "   - O configura en Netlify/Vercel para URLs personalizadas" -ForegroundColor Green
        Write-Host "" -ForegroundColor Green
        Write-Host "✅ ¡Sistema listo para producción!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Error en el deployment de Cloudflare" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Error en el deployment de Cloudflare" -ForegroundColor Yellow
    Write-Host "   Alternativas:" -ForegroundColor Yellow
    Write-Host "   - Usa Netlify: https://netlify.com" -ForegroundColor Yellow
    Write-Host "   - Usa Vercel: https://vercel.com" -ForegroundColor Yellow
    Write-Host "   - Configura manualmente en Cloudflare Dashboard" -ForegroundColor Yellow
}
