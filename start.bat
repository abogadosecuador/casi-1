@echo off
REM Este script inicia el servidor de desarrollo de Vite directamente con Node.js
REM para eludir las políticas de ejecución de PowerShell.

echo Iniciando servidor de desarrollo de Vite...
node .\node_modules\vite\bin\vite.js
