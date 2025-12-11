# Script para verificar que la integración funciona correctamente

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verificando Integración de Sistemas" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectPath = "C:\Users\Usuario\casi-1"
Set-Location $projectPath

# Verificar archivos críticos
Write-Host "Verificando archivos críticos..." -ForegroundColor Yellow
Write-Host ""

$criticalFiles = @(
    "src/App.tsx",
    "src/main.tsx",
    "src/components/Navigation/Navbar.jsx",
    "src/components/Footer/Footer.jsx",
    "src/pages/AbogadosOSPage.tsx",
    "src/pages/WilexGameStationPage.tsx",
    "src/pages/CryptoBankingPage.tsx",
    "src/pages/ProjectsHubPage.tsx",
    "abogados-os/App.tsx",
    "introwilexgamestation/App.tsx",
    "package.json",
    ".env"
)

$allFilesExist = $true
foreach ($file in $criticalFiles) {
    $filePath = Join-Path $projectPath $file
    if (Test-Path $filePath) {
        Write-Host "OK $file" -ForegroundColor Green
    } else {
        Write-Host "FALTA $file" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host ""

if ($allFilesExist) {
    Write-Host "OK Todos los archivos criticos estan presentes" -ForegroundColor Green
} else {
    Write-Host "ERROR Faltan algunos archivos criticos" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verificacion Completada" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para iniciar el servidor de desarrollo, ejecuta:" -ForegroundColor Yellow
Write-Host ".\start-dev.ps1" -ForegroundColor Cyan
Write-Host ""
