@echo off
cls
color 0A
echo ═══════════════════════════════════════════════════════════════
echo    SISTEMA E-COMMERCE COMPLETO - PRODUCCION
echo    Backend + Frontend + Base de Datos
echo ═══════════════════════════════════════════════════════════════
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [ERROR] Node.js no esta instalado
    echo.
    echo Instalar desde: https://nodejs.org
    echo O ejecutar: winget install OpenJS.NodeJS
    pause
    exit /b 1
)

echo [OK] Node.js detectado: 
node --version
echo.

REM Verificar dependencias del frontend
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias del frontend...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        color 0C
        echo [ERROR] Error al instalar dependencias del frontend
        pause
        exit /b 1
    )
)

REM Verificar dependencias del backend
if not exist "backend\node_modules\" (
    echo [INFO] Instalando dependencias del backend...
    cd backend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        color 0C
        echo [ERROR] Error al instalar dependencias del backend
        pause
        exit /b 1
    )
    cd ..
)

REM Verificar archivo .env
if not exist ".env" (
    color 0E
    echo.
    echo [ADVERTENCIA] Archivo .env no encontrado
    echo.
    echo Crear archivo .env con las credenciales necesarias:
    echo - VITE_SUPABASE_URL
    echo - VITE_SUPABASE_ANON_KEY
    echo - SUPABASE_SERVICE_KEY
    echo - STRIPE_SECRET_KEY
    echo.
    echo Ver .env.example para referencia
    echo.
    pause
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo    INICIANDO SISTEMA COMPLETO
echo ═══════════════════════════════════════════════════════════════
echo.
echo [1/2] Iniciando Backend (Puerto 3001)...
start "Backend API" cmd /k "cd backend && npm start"

echo Esperando a que el backend inicie...
timeout /t 5 /nobreak >nul

echo.
echo [2/2] Iniciando Frontend (Puerto 5173)...
start "Frontend Web" cmd /k "npm run dev"

echo.
color 0A
echo ═══════════════════════════════════════════════════════════════
echo    SISTEMA INICIADO CORRECTAMENTE
echo ═══════════════════════════════════════════════════════════════
echo.
echo URLs disponibles:
echo.
echo Frontend:  http://localhost:5173
echo Backend:   http://localhost:3001
echo API Health: http://localhost:3001/api/health
echo.
echo Presiona Ctrl+C en cada ventana para detener los servicios
echo.
echo ═══════════════════════════════════════════════════════════════

pause
