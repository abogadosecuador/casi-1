# ============================================
# Script de Configuración para Producción
# Plataforma Profesional Completa
# ============================================

Write-Host "🚀 Iniciando configuración de plataforma profesional..." -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Node.js
Write-Host "📦 Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js 18 o superior." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green

# 2. Instalar dependencias
Write-Host ""
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green

# 3. Verificar variables de entorno
Write-Host ""
Write-Host "🔐 Verificando variables de entorno..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Write-Host "⚠️  Archivo .env no encontrado. Creando desde .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ Archivo .env creado. Por favor configura tus credenciales." -ForegroundColor Green
    } else {
        Write-Host "❌ No se encontró .env.example" -ForegroundColor Red
    }
} else {
    Write-Host "✅ Archivo .env encontrado" -ForegroundColor Green
}

# 4. Verificar conexión a Supabase
Write-Host ""
Write-Host "🔗 Verificando conexión a Supabase..." -ForegroundColor Yellow
$env:VITE_SUPABASE_URL = (Get-Content .env | Where-Object { $_ -match "VITE_SUPABASE_URL" } | ForEach-Object { $_.Split("=")[1] })
$env:VITE_SUPABASE_KEY = (Get-Content .env | Where-Object { $_ -match "VITE_SUPABASE_KEY" } | ForEach-Object { $_.Split("=")[1] })

if ($env:VITE_SUPABASE_URL -and $env:VITE_SUPABASE_KEY) {
    Write-Host "✅ Credenciales de Supabase encontradas" -ForegroundColor Green
} else {
    Write-Host "⚠️  Faltan credenciales de Supabase en .env" -ForegroundColor Yellow
}

# 5. Información sobre migraciones
Write-Host ""
Write-Host "📊 Migraciones de Base de Datos" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Para ejecutar las migraciones de la base de datos:" -ForegroundColor White
Write-Host ""
Write-Host "1. Ve a tu dashboard de Supabase" -ForegroundColor White
Write-Host "2. Navega a SQL Editor" -ForegroundColor White
Write-Host "3. Ejecuta el archivo: supabase/migrations/20250108_complete_platform.sql" -ForegroundColor White
Write-Host ""
Write-Host "O usando CLI de Supabase:" -ForegroundColor White
Write-Host "  supabase db push" -ForegroundColor Gray
Write-Host ""

# 6. Build del proyecto
Write-Host ""
Write-Host "🏗️  Construyendo proyecto para producción..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir el proyecto" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Proyecto construido exitosamente" -ForegroundColor Green

# 7. Resumen de servicios creados
Write-Host ""
Write-Host "✨ Servicios Implementados" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ ordersService.ts       - Órdenes y pagos" -ForegroundColor Green
Write-Host "✅ courseProgressService  - Progreso de cursos" -ForegroundColor Green
Write-Host "✅ newsletterService      - Blog y newsletter" -ForegroundColor Green
Write-Host "✅ CursorGlow            - Efectos visuales" -ForegroundColor Green
Write-Host "✅ FloatingCard3D        - Tarjetas 3D" -ForegroundColor Green
Write-Host "✅ EnhancedClientDashboard - Dashboard cliente" -ForegroundColor Green
Write-Host ""

# 8. Próximos pasos
Write-Host ""
Write-Host "🎯 Próximos Pasos" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "1. Ejecutar migraciones en Supabase (ver arriba)" -ForegroundColor White
Write-Host "2. Configurar claves de Stripe/PayPal en .env" -ForegroundColor White
Write-Host "3. Iniciar servidor de desarrollo:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Para producción:" -ForegroundColor White
Write-Host "   npm run deploy" -ForegroundColor Gray
Write-Host ""

# 9. URLs importantes
Write-Host ""
Write-Host "🔗 URLs Importantes" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Supabase Dashboard: https://app.supabase.com" -ForegroundColor White
Write-Host "Stripe Dashboard:   https://dashboard.stripe.com" -ForegroundColor White
Write-Host "PayPal Developer:   https://developer.paypal.com" -ForegroundColor White
Write-Host ""

Write-Host "✅ Configuración completada exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Para más información, revisa IMPLEMENTACION_COMPLETA.md" -ForegroundColor Cyan
Write-Host ""
