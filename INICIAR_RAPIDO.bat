@echo off
echo ============================================
echo   INICIANDO SISTEMA E-COMMERCE
echo ============================================
echo.

REM Verificar si Node.js esta instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado
    echo.
    echo Por favor instala Node.js desde: https://nodejs.org
    echo O ejecuta: winget install OpenJS.NodeJS
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detectado
node --version
echo.

REM Verificar si las dependencias estan instaladas
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Error al instalar dependencias
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas
    echo.
)

echo [INFO] Iniciando servidor de desarrollo...
echo.
echo Sistema disponible en: http://localhost:5173
echo Presiona Ctrl+C para detener el servidor
echo.

call npm run dev

pause
