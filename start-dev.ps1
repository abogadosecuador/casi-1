# Script para iniciar desarrollo en localhost
# Verifica Node.js, instala dependencias y lanza dev server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Iniciando Plataforma Integrada Profesional" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar npm
Write-Host "Verificando npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ npm instalado: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm no está instalado" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Navegar al directorio del proyecto
$projectPath = "C:\Users\Usuario\casi-1"
Set-Location $projectPath
Write-Host "Directorio: $projectPath" -ForegroundColor Cyan

# Verificar si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencias ya están instaladas" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "La aplicación estará disponible en:" -ForegroundColor Yellow
Write-Host "  http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

# Lanzar dev server
npm run dev
