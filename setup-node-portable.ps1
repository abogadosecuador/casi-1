# Instalar Node.js Portable (sin permisos admin)
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  CONFIGURANDO NODE.JS PORTABLE" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$nodeVersion = "20.11.0"
$nodeZipUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-win-x64.zip"
$nodeDir = "$PSScriptRoot\nodejs-portable"
$nodeZip = "$env:TEMP\nodejs.zip"

# Limpiar instalación anterior si existe
if (Test-Path $nodeDir) {
    Write-Host "[INFO] Eliminando instalación anterior..." -ForegroundColor Yellow
    Remove-Item $nodeDir -Recurse -Force
}

Write-Host "[1/3] Descargando Node.js portable..." -ForegroundColor Yellow
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $nodeZipUrl -OutFile $nodeZip -UseBasicParsing
    Write-Host "[OK] Descarga completada" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] No se pudo descargar: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2/3] Extrayendo archivos..." -ForegroundColor Yellow
try {
    Expand-Archive -Path $nodeZip -DestinationPath "$PSScriptRoot\temp-node" -Force
    $extractedFolder = Get-ChildItem "$PSScriptRoot\temp-node" | Select-Object -First 1
    Move-Item $extractedFolder.FullName $nodeDir
    Remove-Item "$PSScriptRoot\temp-node" -Recurse -Force
    Remove-Item $nodeZip -Force
    Write-Host "[OK] Node.js extraído" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] No se pudo extraer: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[3/3] Configurando PATH..." -ForegroundColor Yellow
$env:Path = "$nodeDir;$env:Path"
Write-Host "[OK] PATH configurado" -ForegroundColor Green

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  NODE.JS PORTABLE LISTO" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar
try {
    $nodeVer = & "$nodeDir\node.exe" --version
    $npmVer = & "$nodeDir\npm.cmd" --version
    Write-Host "Node.js: $nodeVer" -ForegroundColor Green
    Write-Host "npm: $npmVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Verificación falló: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Ahora instalando dependencias del proyecto..."
Write-Host ""
