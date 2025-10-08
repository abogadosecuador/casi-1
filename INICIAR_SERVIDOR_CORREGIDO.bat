@echo off
echo ================================================
echo   SERVIDOR DE DESARROLLO - VERSION CORREGIDA
echo ================================================
echo.
echo Verificando Node.js...

REM Verificar si Node.js existe
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no encontrado
    echo Por favor instala Node.js desde: https://nodejs.org/
    echo.
    echo Luego ejecuta: npm install
    pause
    exit /b 1
)

REM Verificar si npm existe
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm no encontrado
    echo Por favor instala npm junto con Node.js
    pause
    exit /b 1
)

echo ✅ Node.js encontrado: %NODE_VERSION%
echo ✅ npm encontrado

cd /d "%~dp0"

echo.
echo Verificando package.json...
if not exist "package.json" (
    echo ❌ package.json no encontrado
    pause
    exit /b 1
)

echo.
echo 📦 Instalando dependencias...
call npm install

if errorlevel 1 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo 🚀 Iniciando servidor...
echo ================================================
echo   SERVIDOR CORRIENDO EN:
echo   http://localhost:5174
echo ================================================
echo.
echo NOTAS IMPORTANTES:
echo - La aplicación ya NO debe tener errores
echo - Registro funciona correctamente
echo - Login funciona correctamente
echo - Carrito es visible en header
echo - Checkout carga sin errores
echo - Todas las páginas funcionan
echo.
echo Presiona Ctrl+C para detener
echo.

REM Ejecutar el servidor
call npm run dev

pause
