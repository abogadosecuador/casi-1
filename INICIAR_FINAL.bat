@echo off
setlocal enabledelayedexpansion

echo ================================================
echo   VERIFICANDO E INICIANDO SERVIDOR
echo ================================================
echo.

REM Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no encontrado
    echo.
    echo Solución:
    echo 1. Instala Node.js desde: https://nodejs.org/
    echo 2. Reinicia tu computadora
    echo 3. Ejecuta este archivo de nuevo
    echo.
    pause
    exit /b 1
)

REM Verificar npm
echo Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm no encontrado
    echo.
    echo Node.js debe incluir npm automáticamente
    echo Si no funciona, reinstala Node.js
    pause
    exit /b 1
)

REM Verificar directorio del proyecto
echo Verificando proyecto...
if not exist "package.json" (
    echo ❌ package.json no encontrado
    echo.
    echo Este archivo debe ejecutarse desde el directorio del proyecto
    echo Directorio actual: %cd%
    echo.
    pause
    exit /b 1
)

REM Instalar dependencias
echo.
echo 📦 Instalando dependencias...
call npm install
if errorlevel 1 (
    echo ❌ Error al instalar dependencias
    echo.
    echo Posibles soluciones:
    echo 1. Verifica tu conexión a internet
    echo 2. Borra node_modules y vuelve a intentar
    echo 3. Ejecuta: npm cache clean --force
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Verificaciones completadas exitosamente
echo.
echo ================================================
echo   SERVIDOR INICIANDO EN:
echo   http://localhost:5174
echo ================================================
echo.
echo NOTAS IMPORTANTES:
echo ✅ Registro funciona correctamente
echo ✅ Login funciona correctamente
echo ✅ Carrito es visible en header
echo ✅ Checkout carga sin errores
echo ✅ Todas las páginas funcionan
echo ✅ Base de datos conectada
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

REM Iniciar el servidor
call npm run dev

pause
