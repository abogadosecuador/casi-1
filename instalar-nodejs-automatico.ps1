# Script automatico para instalar Node.js
Write-Host "Descargando Node.js LTS..." -ForegroundColor Cyan

$nodeVersion = "20.11.0"
$installerUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
$installerPath = "$env:TEMP\nodejs-installer.msi"

# Descargar
Write-Host "Descargando desde $installerUrl..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath

# Instalar
Write-Host "Instalando Node.js..." -ForegroundColor Yellow
Start-Process msiexec.exe -ArgumentList "/i", $installerPath, "/quiet", "/norestart" -Wait

# Limpiar
Remove-Item $installerPath -Force

Write-Host ""
Write-Host "Node.js instalado!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANTE: Cierra y abre PowerShell nueva" -ForegroundColor Red
Write-Host ""
Write-Host "Luego ejecuta:" -ForegroundColor Cyan
Write-Host "  npm install" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
