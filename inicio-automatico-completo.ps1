# SCRIPT COMPLETO - INSTALA NODE Y EJECUTA TODO AUTOMATICAMENTE
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  INICIO AUTOMATICO COMPLETO" -ForegroundColor Cyan
Write-Host "  Instalando Node.js + Dependencias + Servidor" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"
$nodeVersion = "20.11.0"
$nodeZipUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-win-x64.zip"
$nodeDir = "$PSScriptRoot\nodejs-portable"
$nodeZip = "$env:TEMP\nodejs.zip"
$nodeExe = "$nodeDir\node.exe"
$npmCmd = "$nodeDir\npm.cmd"

# ============================================
# PASO 1: INSTALAR NODE.JS PORTABLE
# ============================================
Write-Host "PASO 1: INSTALANDO NODE.JS PORTABLE" -ForegroundColor Yellow
Write-Host "--------------------------------------------" -ForegroundColor Gray

if (Test-Path $nodeExe) {
    Write-Host "[OK] Node.js ya está instalado localmente" -ForegroundColor Green
} else {
    Write-Host "Descargando Node.js v$nodeVersion..." -ForegroundColor White
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $nodeZipUrl -OutFile $nodeZip -UseBasicParsing
        Write-Host "[OK] Descarga completada" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Descarga fallida: $_" -ForegroundColor Red
        exit 1
    }

    Write-Host "Extrayendo archivos..." -ForegroundColor White
    try {
        Expand-Archive -Path $nodeZip -DestinationPath "$PSScriptRoot\temp-node" -Force
        $extractedFolder = Get-ChildItem "$PSScriptRoot\temp-node" | Select-Object -First 1
        Move-Item $extractedFolder.FullName $nodeDir -Force
        Remove-Item "$PSScriptRoot\temp-node" -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item $nodeZip -Force -ErrorAction SilentlyContinue
        Write-Host "[OK] Node.js instalado en: $nodeDir" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Extracción fallida: $_" -ForegroundColor Red
        exit 1
    }
}

# Verificar instalación
try {
    $nodeVer = & $nodeExe --version
    $npmVer = & $npmCmd --version
    Write-Host "[OK] Node.js: $nodeVer" -ForegroundColor Green
    Write-Host "[OK] npm: $npmVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Verificación fallida: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# ============================================
# PASO 2: INSTALAR DEPENDENCIAS NPM
# ============================================
Write-Host "PASO 2: INSTALANDO DEPENDENCIAS DEL PROYECTO" -ForegroundColor Yellow
Write-Host "--------------------------------------------" -ForegroundColor Gray

if (Test-Path "$PSScriptRoot\node_modules") {
    Write-Host "[OK] Dependencias ya instaladas" -ForegroundColor Green
} else {
    Write-Host "Ejecutando npm install (esto puede tardar 2-3 minutos)..." -ForegroundColor White
    try {
        $env:Path = "$nodeDir;$env:Path"
        & $npmCmd install --loglevel=error
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Dependencias instaladas correctamente" -ForegroundColor Green
        } else {
            Write-Host "[ERROR] npm install falló con código: $LASTEXITCODE" -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "[ERROR] npm install falló: $_" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# ============================================
# PASO 3: INICIAR SERVIDOR DE DESARROLLO
# ============================================
Write-Host "PASO 3: INICIANDO SERVIDOR DE DESARROLLO" -ForegroundColor Yellow
Write-Host "--------------------------------------------" -ForegroundColor Gray
Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "  SERVIDOR INICIANDO..." -ForegroundColor Green
Write-Host "  URL: http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Presiona Ctrl+C para detener" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

try {
    $env:Path = "$nodeDir;$env:Path"
    & $npmCmd run dev
} catch {
    Write-Host "[ERROR] No se pudo iniciar el servidor: $_" -ForegroundColor Red
    exit 1
}
