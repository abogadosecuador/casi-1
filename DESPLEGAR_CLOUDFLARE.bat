@echo off
echo =========================================
echo Desplegando a Cloudflare Workers
echo =========================================
echo.

echo [1/3] Construyendo aplicacion React...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Fallo la construccion
    pause
    exit /b 1
)
echo.

echo [2/3] Desplegando a Cloudflare Workers...
call wrangler deploy
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Fallo el despliegue
    pause
    exit /b 1
)
echo.

echo [3/3] Despliegue completado exitosamente!
echo.
echo Tu aplicacion esta disponible en: https://abogados.ecuador.workers.dev
echo.
pause
