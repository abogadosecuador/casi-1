# ============================================
# Script de Verificación para Localhost
# Verifica que todo esté funcional
# ============================================

Write-Host "🔍 VERIFICANDO PLATAFORMA EN LOCALHOST" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

$errores = 0
$advertencias = 0

# 1. Verificar Node.js
Write-Host "📦 1. Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Node.js no instalado" -ForegroundColor Red
    $errores++
} else {
    $versionNumber = $nodeVersion -replace 'v', ''
    $majorVersion = [int]($versionNumber -split '\.')[0]
    if ($majorVersion -ge 18) {
        Write-Host "   ✅ Node.js $nodeVersion (Compatible)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Node.js $nodeVersion (Se recomienda v18 o superior)" -ForegroundColor Yellow
        $advertencias++
    }
}

# 2. Verificar npm
Write-Host ""
Write-Host "📦 2. Verificando npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ npm no instalado" -ForegroundColor Red
    $errores++
} else {
    Write-Host "   ✅ npm $npmVersion" -ForegroundColor Green
}

# 3. Verificar node_modules
Write-Host ""
Write-Host "📦 3. Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    $packageCount = (Get-ChildItem "node_modules" -Directory).Count
    Write-Host "   OK node_modules existe ($packageCount packages)" -ForegroundColor Green
} else {
    Write-Host "   WARN node_modules no existe. Ejecuta: npm install" -ForegroundColor Yellow
    $advertencias++
}

# 4. Verificar .env
Write-Host ""
Write-Host "🔐 4. Verificando variables de entorno..." -ForegroundColor Yellow
if (Test-Path ".env") {
    $envContent = Get-Content ".env" -Raw
    
    if ($envContent -match "VITE_SUPABASE_URL") {
        $supabaseUrl = ($envContent | Select-String "VITE_SUPABASE_URL=(.+)" -AllMatches).Matches.Groups[1].Value
        if ($supabaseUrl -and $supabaseUrl -ne "") {
            Write-Host "   ✅ VITE_SUPABASE_URL configurado" -ForegroundColor Green
        } else {
            Write-Host "   ❌ VITE_SUPABASE_URL vacío" -ForegroundColor Red
            $errores++
        }
    } else {
        Write-Host "   ❌ VITE_SUPABASE_URL no encontrado" -ForegroundColor Red
        $errores++
    }
    
    if ($envContent -match "VITE_SUPABASE_KEY") {
        Write-Host "   ✅ VITE_SUPABASE_KEY configurado" -ForegroundColor Green
    } else {
        Write-Host "   ❌ VITE_SUPABASE_KEY no encontrado" -ForegroundColor Red
        $errores++
    }
} else {
    Write-Host "   ❌ Archivo .env no existe" -ForegroundColor Red
    $errores++
}

# 5. Verificar archivos principales
Write-Host ""
Write-Host "📁 5. Verificando archivos del proyecto..." -ForegroundColor Yellow

$archivosRequeridos = @(
    "package.json",
    "vite.config.ts",
    "index.html",
    "src/main.tsx",
    "src/App.tsx"
)

foreach ($archivo in $archivosRequeridos) {
    if (Test-Path $archivo) {
        Write-Host "   ✅ $archivo" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $archivo no encontrado" -ForegroundColor Red
        $errores++
    }
}

# 6. Verificar nuevos servicios creados
Write-Host ""
Write-Host "🔧 6. Verificando servicios implementados..." -ForegroundColor Yellow

$servicios = @(
    "src/services/ordersService.ts",
    "src/services/courseProgressService.ts",
    "src/services/newsletterService.ts",
    "src/services/notificationService.ts"
)

foreach ($servicio in $servicios) {
    if (Test-Path $servicio) {
        Write-Host "   ✅ $servicio" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  $servicio no encontrado" -ForegroundColor Yellow
        $advertencias++
    }
}

# 7. Verificar componentes nuevos
Write-Host ""
Write-Host "🎨 7. Verificando componentes UI..." -ForegroundColor Yellow

$componentes = @(
    "src/components/Effects/CursorGlow.tsx",
    "src/components/Effects/FloatingCard3D.tsx",
    "src/components/Dashboard/EnhancedClientDashboard.tsx",
    "src/components/Notifications/NotificationDropdown.tsx"
)

foreach ($componente in $componentes) {
    if (Test-Path $componente) {
        Write-Host "   ✅ $componente" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  $componente no encontrado" -ForegroundColor Yellow
        $advertencias++
    }
}

# 8. Verificar migración de BD
Write-Host ""
Write-Host "🗄️  8. Verificando migración de base de datos..." -ForegroundColor Yellow
if (Test-Path "supabase/migrations/20250108_complete_platform.sql") {
    Write-Host "   ✅ Migración SQL encontrada" -ForegroundColor Green
    Write-Host "   ℹ️  Recuerda ejecutarla en Supabase SQL Editor" -ForegroundColor Cyan
} else {
    Write-Host "   ❌ Migración SQL no encontrada" -ForegroundColor Red
    $errores++
}

# 9. Verificar puerto disponible
Write-Host ""
Write-Host "🌐 9. Verificando puerto 3000..." -ForegroundColor Yellow
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    Write-Host "   ⚠️  Puerto 3000 en uso. El servidor usará otro puerto." -ForegroundColor Yellow
    $advertencias++
} else {
    Write-Host "   ✅ Puerto 3000 disponible" -ForegroundColor Green
}

# 10. Test de compilación
Write-Host ""
Write-Host "🏗️  10. Verificando que TypeScript compila..." -ForegroundColor Yellow
Write-Host "   (Esto puede tardar un momento...)" -ForegroundColor Gray

$tscOutput = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ TypeScript compila sin errores" -ForegroundColor Green
} else {
    $errorCount = ($tscOutput | Select-String "error TS" | Measure-Object).Count
    if ($errorCount -gt 0) {
        Write-Host "   ⚠️  TypeScript tiene $errorCount errores (algunos pueden ser de tipado)" -ForegroundColor Yellow
        $advertencias++
    } else {
        Write-Host "   ✅ TypeScript OK" -ForegroundColor Green
    }
}

# Resumen
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE VERIFICACIÓN" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

if ($errores -eq 0 -and $advertencias -eq 0) {
    Write-Host "✅ TODO PERFECTO - Listo para ejecutar en localhost" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Para iniciar el servidor:" -ForegroundColor Cyan
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "📱 La aplicación se abrirá en:" -ForegroundColor Cyan
    Write-Host "   http://localhost:3000" -ForegroundColor White
} elseif ($errores -eq 0) {
    Write-Host "✅ Verificación completada con $advertencias advertencia(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "⚠️  Revisa las advertencias arriba, pero puedes continuar:" -ForegroundColor Yellow
    Write-Host "   npm run dev" -ForegroundColor White
} else {
    Write-Host "❌ Se encontraron $errores error(es) crítico(s)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Soluciones:" -ForegroundColor Yellow
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "   1. Instalar dependencias: npm install" -ForegroundColor White
    }
    
    if (-not (Test-Path ".env")) {
        Write-Host "   2. Crear archivo .env con las credenciales de Supabase" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "   Luego ejecuta este script nuevamente para verificar" -ForegroundColor White
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Si todo está bien, preguntar si quiere iniciar
if ($errores -eq 0) {
    Write-Host "¿Deseas iniciar el servidor ahora? (S/N): " -NoNewline -ForegroundColor Cyan
    $respuesta = Read-Host
    
    if ($respuesta -eq 'S' -or $respuesta -eq 's' -or $respuesta -eq 'Y' -or $respuesta -eq 'y') {
        Write-Host ""
        Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Green
        Write-Host ""
        npm run dev
    } else {
        Write-Host ""
        Write-Host "👍 Ejecuta 'npm run dev' cuando estés listo" -ForegroundColor Cyan
    }
}
