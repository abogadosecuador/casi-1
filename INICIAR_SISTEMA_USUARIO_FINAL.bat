@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

cls
echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                                                                              ║
echo ║         PLATAFORMA INTEGRADA PROFESIONAL - USUARIO FINAL                    ║
echo ║                                                                              ║
echo ║  Sistemas: Abogados OS + Games + Crypto Banking                             ║
echo ║  Ambiente: Desarrollo Local (localhost:5173)                                ║
echo ║                                                                              ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Node.js está instalado
echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  Node.js no está instalado. Intentando instalar automáticamente...
    echo.
    
    REM Intentar instalar con winget
    winget install -e --id OpenJS.NodeJS.LTS --silent >nul 2>&1
    if errorlevel 1 (
        echo ❌ No se pudo instalar Node.js automáticamente
        echo.
        echo Por favor:
        echo 1. Descarga Node.js desde: https://nodejs.org/
        echo 2. Instala la versión LTS
        echo 3. Vuelve a ejecutar este archivo
        echo.
        pause
        exit /b 1
    )
    
    REM Refrescar variables de entorno
    for /f "tokens=2*" %%A in ('reg query HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment /v PATH') do set "PATH=%%B"
    setx PATH "%PATH%;C:\Program Files\nodejs"
    
    echo ✓ Node.js instalado correctamente
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js: %NODE_VERSION%

REM Verificar npm
echo.
echo [2/4] Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm no está disponible
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm: %NPM_VERSION%

REM Navegar al directorio del proyecto
cd /d C:\Users\Usuario\casi-1
if errorlevel 1 (
    echo ❌ No se pudo acceder al directorio del proyecto
    pause
    exit /b 1
)

echo.
echo [3/4] Instalando dependencias...
if not exist "node_modules" (
    echo Descargando e instalando paquetes (esto puede tomar 1-2 minutos)...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ❌ Error al instalar dependencias
        pause
        exit /b 1
    )
    echo ✓ Dependencias instaladas correctamente
) else (
    echo ✓ Dependencias ya están instaladas
)

echo.
echo [4/4] Verificando estructura de módulos...
if not exist "src\modules\abogados-os" (
    echo ❌ Módulo Abogados OS no encontrado
    pause
    exit /b 1
)
if not exist "src\modules\games" (
    echo ❌ Módulo Games no encontrado
    pause
    exit /b 1
)
if not exist "src\modules\crypto-banking" (
    echo ❌ Módulo Crypto Banking no encontrado
    pause
    exit /b 1
)
echo ✓ Todos los módulos están presentes

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                                                                              ║
echo ║                    ✓ SISTEMA LISTO PARA EJECUTAR                            ║
echo ║                                                                              ║
echo ║  La aplicación se abrirá en: http://localhost:5173                          ║
echo ║                                                                              ║
echo ║  Sistemas Disponibles:                                                       ║
echo ║  • Abogados OS ..................... /abogados-os                           ║
echo ║  • Wilex Game Station ............. /games                                  ║
echo ║  • WI Global Banking & Crypto ..... /crypto-banking                         ║
echo ║  • Hub de Proyectos ............... /proyectos                              ║
echo ║                                                                              ║
echo ║  Funcionalidades:                                                            ║
echo ║  ✓ Registro de usuarios                                                      ║
echo ║  ✓ Inicio de sesión                                                          ║
echo ║  ✓ Sistema de compras (PayPal)                                               ║
echo ║  ✓ Sincronización de autenticación entre módulos                             ║
echo ║  ✓ Diseño profesional y responsivo                                           ║
echo ║                                                                              ║
echo ║  Para detener el servidor: Presiona Ctrl+C                                  ║
echo ║                                                                              ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

REM Iniciar servidor de desarrollo
echo Iniciando servidor de desarrollo...
echo.
call npm run dev

pause
