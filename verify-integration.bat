@echo off
REM Script para verificar que la integración funciona correctamente

echo.
echo ========================================
echo Verificando Integración de Sistemas
echo ========================================
echo.

cd /d C:\Users\Usuario\casi-1

REM Verificar archivos críticos
echo Verificando archivos críticos...
echo.

set "allFilesExist=1"

if exist "src\App.tsx" (
    echo [OK] src\App.tsx
) else (
    echo [FALTA] src\App.tsx
    set "allFilesExist=0"
)

if exist "src\components\Navigation\Navbar.jsx" (
    echo [OK] src\components\Navigation\Navbar.jsx
) else (
    echo [FALTA] src\components\Navigation\Navbar.jsx
    set "allFilesExist=0"
)

if exist "src\components\Footer\Footer.jsx" (
    echo [OK] src\components\Footer\Footer.jsx
) else (
    echo [FALTA] src\components\Footer\Footer.jsx
    set "allFilesExist=0"
)

if exist "src\pages\AbogadosOSPage.tsx" (
    echo [OK] src\pages\AbogadosOSPage.tsx
) else (
    echo [FALTA] src\pages\AbogadosOSPage.tsx
    set "allFilesExist=0"
)

if exist "src\pages\WilexGameStationPage.tsx" (
    echo [OK] src\pages\WilexGameStationPage.tsx
) else (
    echo [FALTA] src\pages\WilexGameStationPage.tsx
    set "allFilesExist=0"
)

if exist "src\pages\CryptoBankingPage.tsx" (
    echo [OK] src\pages\CryptoBankingPage.tsx
) else (
    echo [FALTA] src\pages\CryptoBankingPage.tsx
    set "allFilesExist=0"
)

if exist "abogados-os\App.tsx" (
    echo [OK] abogados-os\App.tsx
) else (
    echo [FALTA] abogados-os\App.tsx
    set "allFilesExist=0"
)

if exist "introwilexgamestation\App.tsx" (
    echo [OK] introwilexgamestation\App.tsx
) else (
    echo [FALTA] introwilexgamestation\App.tsx
    set "allFilesExist=0"
)

if exist "wiglobalbanking&cryptoecosystem\App.tsx" (
    echo [OK] wiglobalbanking^&cryptoecosystem\App.tsx
) else (
    echo [FALTA] wiglobalbanking^&cryptoecosystem\App.tsx
    set "allFilesExist=0"
)

if exist "package.json" (
    echo [OK] package.json
) else (
    echo [FALTA] package.json
    set "allFilesExist=0"
)

if exist ".env" (
    echo [OK] .env
) else (
    echo [FALTA] .env
    set "allFilesExist=0"
)

echo.

if "%allFilesExist%"=="1" (
    echo [OK] Todos los archivos críticos están presentes
) else (
    echo [ERROR] Faltan algunos archivos críticos
    pause
    exit /b 1
)

echo.
echo ========================================
echo Verificación Completada
echo ========================================
echo.
echo Para iniciar el servidor de desarrollo, ejecuta:
echo   start-dev.bat
echo.
pause
