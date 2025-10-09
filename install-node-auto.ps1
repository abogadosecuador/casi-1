# Script para instalar Node.js automáticamente
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  INSTALANDO NODE.JS AUTOMATICAMENTE" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# URL del instalador de Node.js LTS
$nodeVersion = "20.11.0"
$installerUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
$installerPath = "$env:TEMP\nodejs-installer.msi"

Write-Host "[1/4] Descargando Node.js v$nodeVersion..." -ForegroundColor Yellow
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath -UseBasicParsing
    Write-Host "[OK] Descarga completada" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] No se pudo descargar Node.js" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[2/4] Instalando Node.js (esto puede tardar 1-2 minutos)..." -ForegroundColor Yellow
try {
    # Instalar silenciosamente
    $process = Start-Process msiexec.exe -ArgumentList "/i `"$installerPath`" /quiet /norestart ADDLOCAL=ALL" -Wait -PassThru
    
    if ($process.ExitCode -eq 0) {
        Write-Host "[OK] Node.js instalado correctamente" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Error en la instalación. Código: $($process.ExitCode)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "[ERROR] No se pudo instalar Node.js" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[3/4] Actualizando PATH del sistema..." -ForegroundColor Yellow
# Actualizar PATH en la sesión actual
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
$nodePath = "C:\Program Files\nodejs"
if (-not $env:Path.Contains($nodePath)) {
    $env:Path += ";$nodePath"
}
Write-Host "[OK] PATH actualizado" -ForegroundColor Green

Write-Host ""
Write-Host "[4/4] Verificando instalación..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

try {
    $nodeVersionCheck = & "C:\Program Files\nodejs\node.exe" --version
    $npmVersionCheck = & "C:\Program Files\nodejs\npm.cmd" --version
    
    Write-Host "[OK] Node.js instalado: $nodeVersionCheck" -ForegroundColor Green
    Write-Host "[OK] npm instalado: $npmVersionCheck" -ForegroundColor Green
} catch {
    Write-Host "[ADVERTENCIA] Instalación completada pero verificación falló" -ForegroundColor Yellow
    Write-Host "Por favor, cierra y abre una nueva terminal" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  NODE.JS INSTALADO EXITOSAMENTE" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Limpiar archivo temporal
Remove-Item $installerPath -Force -ErrorAction SilentlyContinue

Write-Host "Presiona cualquier tecla para continuar con npm install..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
