@echo off
echo ================================================
echo   INICIANDO SERVIDOR DE DESARROLLO
echo ================================================
echo.
echo Actualizando PATH...
set PATH=%PATH%;C:\Program Files\nodejs\;C:\Users\Usuario\AppData\Roaming\npm

cd /d "%~dp0"

echo Verificando npm...
call npm --version
if errorlevel 1 (
    echo ERROR: npm no encontrado
    echo Por favor, instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Iniciando servidor...
echo.
echo ================================================
echo   SERVIDOR CORRIENDO EN:
echo   http://localhost:5174
echo ================================================
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

call npm run dev

pause
