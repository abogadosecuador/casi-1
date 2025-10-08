#!/bin/bash

# Script para ejecutar el servidor de desarrollo correctamente

echo "============================================"
echo "   EJECUTANDO SERVIDOR DE DESARROLLO"
echo "============================================"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no encontrado"
    echo "Por favor instala Node.js desde: https://nodejs.org/"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no encontrado"
    echo "Por favor instala npm junto con Node.js"
    exit 1
fi

echo "✅ Node.js versión: $(node --version)"
echo "✅ npm versión: $(npm --version)"

# Ir al directorio del proyecto
cd "$(dirname "$0")"

# Verificar si package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ package.json no encontrado en $(pwd)"
    exit 1
fi

echo ""
echo "📦 Instalando dependencias si es necesario..."
npm install

echo ""
echo "🚀 Iniciando servidor de desarrollo..."
echo "============================================"
echo "   URL: http://localhost:5174"
echo "============================================"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

# Ejecutar el servidor
npm run dev
