# ============================================
# Verificacion para Localhost - Simple
# ============================================

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "VERIFICANDO PLATAFORMA EN LOCALHOST" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$errores = 0
$warnings = 0

# 1. Node.js
Write-Host "1. Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   OK: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "   ERROR: Node.js no instalado" -ForegroundColor Red
    $errores++
}

# 2. npm
Write-Host "2. npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   OK: npm $npmVersion" -ForegroundColor Green
} else {
    Write-Host "   ERROR: npm no instalado" -ForegroundColor Red
    $errores++
}

# 3. node_modules
Write-Host "3. Dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   OK: node_modules existe" -ForegroundColor Green
} else {
    Write-Host "   WARNING: node_modules falta. Run: npm install" -ForegroundColor Yellow
    $warnings++
}

# 4. .env
Write-Host "4. Variables de entorno..." -ForegroundColor Yellow
if (Test-Path ".env") {
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "VITE_SUPABASE_URL") {
        Write-Host "   OK: VITE_SUPABASE_URL configurado" -ForegroundColor Green
    } else {
        Write-Host "   ERROR: VITE_SUPABASE_URL falta" -ForegroundColor Red
        $errores++
    }
    
    if ($envContent -match "VITE_SUPABASE_KEY") {
        Write-Host "   OK: VITE_SUPABASE_KEY configurado" -ForegroundColor Green
    } else {
        Write-Host "   ERROR: VITE_SUPABASE_KEY falta" -ForegroundColor Red
        $errores++
    }
} else {
    Write-Host "   ERROR: .env no existe" -ForegroundColor Red
    $errores++
}

# 5. Archivos principales
Write-Host "5. Archivos principales..." -ForegroundColor Yellow
$archivos = @("package.json", "vite.config.ts", "index.html", "src/main.tsx", "src/App.tsx")
foreach ($archivo in $archivos) {
    if (Test-Path $archivo) {
        Write-Host "   OK: $archivo" -ForegroundColor Green
    } else {
        Write-Host "   ERROR: $archivo falta" -ForegroundColor Red
        $errores++
    }
}

# 6. Servicios
Write-Host "6. Servicios backend..." -ForegroundColor Yellow
$servicios = @(
    "src/services/ordersService.ts",
    "src/services/courseProgressService.ts",
    "src/services/newsletterService.ts",
    "src/services/notificationService.ts"
)
foreach ($servicio in $servicios) {
    if (Test-Path $servicio) {
        Write-Host "   OK: $servicio" -ForegroundColor Green
    } else {
        Write-Host "   WARNING: $servicio falta" -ForegroundColor Yellow
        $warnings++
    }
}

# 7. Componentes
Write-Host "7. Componentes UI..." -ForegroundColor Yellow
$componentes = @(
    "src/components/Effects/CursorGlow.tsx",
    "src/components/Effects/FloatingCard3D.tsx",
    "src/components/Dashboard/EnhancedClientDashboard.tsx"
)
foreach ($componente in $componentes) {
    if (Test-Path $componente) {
        Write-Host "   OK: $componente" -ForegroundColor Green
    } else {
        Write-Host "   WARNING: $componente falta" -ForegroundColor Yellow
        $warnings++
    }
}

# 8. Migracion BD
Write-Host "8. Migracion de base de datos..." -ForegroundColor Yellow
if (Test-Path "supabase/migrations/20250108_complete_platform.sql") {
    Write-Host "   OK: Migracion SQL encontrada" -ForegroundColor Green
    Write-Host "   INFO: Ejecutala en Supabase SQL Editor" -ForegroundColor Cyan
} else {
    Write-Host "   WARNING: Migracion SQL falta" -ForegroundColor Yellow
    $warnings++
}

# Resumen
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "RESUMEN" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

if ($errores -eq 0 -and $warnings -eq 0) {
    Write-Host "TODO PERFECTO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Para iniciar:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Se abrira en: http://localhost:3000" -ForegroundColor White
} elseif ($errores -eq 0) {
    Write-Host "OK con $warnings warning(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Puedes continuar:" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor White
} else {
    Write-Host "ERRORES ENCONTRADOS: $errores" -ForegroundColor Red
    Write-Host ""
    Write-Host "Soluciones:" -ForegroundColor Yellow
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "  npm install" -ForegroundColor White
    }
    
    if (-not (Test-Path ".env")) {
        Write-Host "  Crear .env con credenciales de Supabase" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Preguntar si iniciar
if ($errores -eq 0) {
    $respuesta = Read-Host "Iniciar servidor ahora? (S/N)"
    
    if ($respuesta -eq 'S' -or $respuesta -eq 's') {
        Write-Host ""
        Write-Host "Iniciando..." -ForegroundColor Green
        Write-Host ""
        npm run dev
    }
}
