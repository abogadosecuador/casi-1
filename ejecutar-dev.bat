@echo off
REM Ejecutar servidor de desarrollo sin requerir intervención

cd /d C:\Users\Usuario\casi-1

REM Detener procesos Node existentes
taskkill /F /IM node.exe 2>nul

REM Esperar 2 segundos
timeout /t 2 /nobreak

REM Ejecutar npm run dev
npm run dev
