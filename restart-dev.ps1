# Script para reiniciar el servidor de desarrollo
# Detiene el proceso actual y reinicia Vite

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Reiniciando Servidor de Desarrollo" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectPath = "C:\Users\Usuario\casi-1"
Set-Location $projectPath

# Detener procesos Vite existentes
Write-Host "Deteniendo procesos Vite..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -match "vite" } | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "Node.js no encontrado. Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Limpiar caché de npm
Write-Host "Limpiando caché..." -ForegroundColor Yellow
npm cache clean --force 2>$null

# Instalar dependencias si es necesario
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "La aplicacion estara disponible en:" -ForegroundColor Green
Write-Host "http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

npm run dev
