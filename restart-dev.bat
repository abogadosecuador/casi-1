@echo off
REM Script para reiniciar el servidor de desarrollo

echo ========================================
echo Reiniciando Servidor de Desarrollo
echo ========================================
echo.

cd /d C:\Users\Usuario\casi-1

REM Detener procesos Node existentes
echo Deteniendo procesos Node...
taskkill /F /IM node.exe 2>nul

timeout /t 2 /nobreak

REM Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js no encontrado. Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Limpiar caché
echo Limpiando cache...
npm cache clean --force 2>nul

REM Instalar dependencias si es necesario
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
)

echo.
echo ========================================
echo Iniciando servidor de desarrollo...
echo ========================================
echo.
echo La aplicacion estara disponible en:
echo http://localhost:5173
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

call npm run dev
pause
