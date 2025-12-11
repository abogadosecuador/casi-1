# Script completo para reiniciar TODO el sistema sin errores

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "REINICIANDO SISTEMA COMPLETAMENTE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectPath = "C:\Users\Usuario\casi-1"
Set-Location $projectPath

# Paso 1: Detener todos los procesos Node
Write-Host "[1/6] Deteniendo procesos Node..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Paso 2: Limpiar caché de npm
Write-Host "[2/6] Limpiando caché de npm..." -ForegroundColor Yellow
npm cache clean --force 2>$null

# Paso 3: Eliminar node_modules y package-lock.json
Write-Host "[3/6] Eliminando node_modules y package-lock.json..." -ForegroundColor Yellow
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue

# Paso 4: Instalar dependencias nuevamente
Write-Host "[4/6] Instalando dependencias..." -ForegroundColor Yellow
npm install

# Paso 5: Limpiar caché de Vite
Write-Host "[5/6] Limpiando caché de Vite..." -ForegroundColor Yellow
Remove-Item -Path ".vite" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue

# Paso 6: Iniciar servidor
Write-Host "[6/6] Iniciando servidor de desarrollo..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SERVIDOR INICIANDO EN LOCALHOST:5173" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Rutas disponibles:" -ForegroundColor Cyan
Write-Host "  - http://localhost:5173/login" -ForegroundColor Green
Write-Host "  - http://localhost:5173/register" -ForegroundColor Green
Write-Host "  - http://localhost:5173/proyectos" -ForegroundColor Green
Write-Host "  - http://localhost:5173/abogados-os" -ForegroundColor Green
Write-Host "  - http://localhost:5173/games" -ForegroundColor Green
Write-Host "  - http://localhost:5173/crypto-banking" -ForegroundColor Green
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

npm run dev
