@echo off
title Sistema E-Commerce - Localhost
color 0A

echo.
echo ============================================
echo    SISTEMA E-COMMERCE PROFESIONAL
echo ============================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js no esta instalado
    echo.
    echo Instalar desde: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo Node.js detectado
node --version
echo.

REM Verificar dependencias
if not exist "node_modules\" (
    echo Instalando dependencias del frontend...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error al instalar dependencias
        pause
        exit /b 1
    )
)

if not exist "backend\node_modules\" (
    echo Instalando dependencias del backend...
    cd backend
    call npm install
    cd ..
)

echo.
echo ============================================
echo    INICIANDO SERVIDOR
echo ============================================
echo.
echo Puerto: 5173
echo URL: http://localhost:5173
echo.
echo Backend interno: puerto 3001 (oculto)
echo Proxy automatico configurado
echo.
echo Presiona Ctrl+C para detener
echo ============================================
echo.

REM Iniciar backend en segundo plano
start /B cmd /c "cd backend && npm start"

REM Esperar que el backend inicie
timeout /t 3 /nobreak >nul

REM Iniciar frontend
call npm run dev

pause
