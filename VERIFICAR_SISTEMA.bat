@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

cls
echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗
echo ║                                                                              ║
echo ║              VERIFICACIÓN DE SISTEMA - PLATAFORMA INTEGRADA                 ║
echo ║                                                                              ║
echo ╚══════════════════════════════════════════════════════════════════════════════╝
echo.

set "ERRORS=0"

REM Verificar Node.js
echo [1/7] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    set /a ERRORS+=1
) else (
    for /f "tokens=*" %%i in ('node --version') do echo ✓ Node.js: %%i
)

REM Verificar npm
echo [2/7] Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm no está instalado
    set /a ERRORS+=1
) else (
    for /f "tokens=*" %%i in ('npm --version') do echo ✓ npm: %%i
)

REM Verificar directorio del proyecto
echo [3/7] Verificando directorio del proyecto...
if not exist "C:\Users\Usuario\casi-1" (
    echo ❌ Directorio del proyecto no encontrado
    set /a ERRORS+=1
) else (
    echo ✓ Directorio encontrado: C:\Users\Usuario\casi-1
)

REM Verificar node_modules
echo [4/7] Verificando dependencias...
if not exist "C:\Users\Usuario\casi-1\node_modules" (
    echo ⚠️  Dependencias no instaladas (ejecuta INICIAR_SISTEMA_USUARIO_FINAL.bat)
    set /a ERRORS+=1
) else (
    echo ✓ Dependencias instaladas
)

REM Verificar módulos
echo [5/7] Verificando módulos integrados...
set "MODULES_OK=1"

if not exist "C:\Users\Usuario\casi-1\src\modules\abogados-os" (
    echo ❌ Módulo Abogados OS no encontrado
    set /a ERRORS+=1
    set "MODULES_OK=0"
) else (
    echo ✓ Abogados OS
)

if not exist "C:\Users\Usuario\casi-1\src\modules\games" (
    echo ❌ Módulo Games no encontrado
    set /a ERRORS+=1
    set "MODULES_OK=0"
) else (
    echo ✓ Wilex Game Station
)

if not exist "C:\Users\Usuario\casi-1\src\modules\crypto-banking" (
    echo ❌ Módulo Crypto Banking no encontrado
    set /a ERRORS+=1
    set "MODULES_OK=0"
) else (
    echo ✓ WI Global Banking & Crypto
)

REM Verificar páginas
echo [6/7] Verificando páginas...
if not exist "C:\Users\Usuario\casi-1\src\pages\LoginPage.tsx" (
    echo ❌ LoginPage no encontrada
    set /a ERRORS+=1
) else (
    echo ✓ LoginPage
)

if not exist "C:\Users\Usuario\casi-1\src\pages\RegisterPage.tsx" (
    echo ❌ RegisterPage no encontrada
    set /a ERRORS+=1
) else (
    echo ✓ RegisterPage
)

REM Verificar archivos de configuración
echo [7/7] Verificando configuración...
if not exist "C:\Users\Usuario\casi-1\package.json" (
    echo ❌ package.json no encontrado
    set /a ERRORS+=1
) else (
    echo ✓ package.json
)

if not exist "C:\Users\Usuario\casi-1\vite.config.ts" (
    echo ❌ vite.config.ts no encontrado
    set /a ERRORS+=1
) else (
    echo ✓ vite.config.ts
)

echo.
echo ╔══════════════════════════════════════════════════════════════════════════════╗

if %ERRORS% equ 0 (
    echo ║                                                                              ║
    echo ║                    ✓ SISTEMA VERIFICADO CORRECTAMENTE                       ║
    echo ║                                                                              ║
    echo ║  El sistema está listo para ejecutar:                                       ║
    echo ║  1. Ejecuta: INICIAR_SISTEMA_USUARIO_FINAL.bat                             ║
    echo ║  2. Abre: http://localhost:5173                                             ║
    echo ║  3. ¡Disfruta la plataforma!                                                ║
    echo ║                                                                              ║
    echo ╚══════════════════════════════════════════════════════════════════════════════╝
) else (
    echo ║                                                                              ║
    echo ║                    ❌ SE ENCONTRARON %ERRORS% PROBLEMAS                        ║
    echo ║                                                                              ║
    echo ║  Por favor:                                                                  ║
    echo ║  1. Ejecuta: INICIAR_SISTEMA_USUARIO_FINAL.bat                             ║
    echo ║  2. Espera a que se instale todo automáticamente                            ║
    echo ║  3. Vuelve a ejecutar este script                                           ║
    echo ║                                                                              ║
    echo ╚══════════════════════════════════════════════════════════════════════════════╝
)

echo.
pause
