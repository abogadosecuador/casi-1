@echo off
REM Script para iniciar desarrollo en localhost (Windows CMD)

echo.
echo ========================================
echo Iniciando Plataforma Integrada Profesional
echo ========================================
echo.

REM Verificar si Node.js está instalado
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo X Node.js no está instalado
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js instalado: %NODE_VERSION%

REM Verificar npm
echo Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo X npm no está instalado
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm instalado: %NPM_VERSION%

echo.

REM Navegar al directorio del proyecto
cd /d C:\Users\Usuario\casi-1
echo Directorio: %cd%

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo.
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo X Error al instalar dependencias
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas correctamente
) else (
    echo [OK] Dependencias ya están instaladas
)

echo.
echo ========================================
echo Iniciando servidor de desarrollo...
echo ========================================
echo.
echo La aplicación estará disponible en:
echo   http://localhost:5173
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Lanzar dev server
call npm run dev
pause
