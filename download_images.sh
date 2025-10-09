#!/bin/bash

# Script para descargar imágenes profesionales para cursos y ebooks
# Ejecutar en la carpeta public/images/

echo "🚀 Descargando imágenes profesionales..."

# Crear directorios si no existen
mkdir -p courses ebooks

# Descargar imágenes para cursos
echo "📚 Descargando imágenes de cursos..."
curl -L -o "courses/derecho-penal.jpg" "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" || echo "❌ Error descargando imagen de derecho penal"
curl -L -o "courses/contratos.jpg" "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" || echo "❌ Error descargando imagen de contratos"
curl -L -o "courses/litigacion.jpg" "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" || echo "❌ Error descargando imagen de litigación"
curl -L -o "courses/laboral.jpg" "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" || echo "❌ Error descargando imagen laboral"
curl -L -o "courses/transito.jpg" "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" || echo "❌ Error descargando imagen de tránsito"
curl -L -o "courses/aduanero.jpg" "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" || echo "❌ Error descargando imagen aduanera"

# Descargar imágenes para ebooks
echo "📖 Descargando imágenes de ebooks..."
curl -L -o "ebooks/introduccion-derecho.jpg" "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" || echo "❌ Error descargando imagen de introducción al derecho"
curl -L -o "ebooks/derecho-civil.jpg" "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" || echo "❌ Error descargando imagen de derecho civil"
curl -L -o "ebooks/derecho-penal.jpg" "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" || echo "❌ Error descargando imagen de derecho penal"
curl -L -o "ebooks/derecho-comercial.jpg" "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" || echo "❌ Error descargando imagen de derecho comercial"
curl -L -o "ebooks/derecho-transito.jpg" "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" || echo "❌ Error descargando imagen de tránsito"
curl -L -o "ebooks/derecho-aduanero.jpg" "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" || echo "❌ Error descargando imagen aduanera"
curl -L -o "ebooks/divorcio.jpg" "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" || echo "❌ Error descargando imagen de divorcio"

echo "✅ ¡Proceso de descarga completado!"
echo ""
echo "📋 Resumen de archivos descargados:"
echo "   📚 Cursos: 6 imágenes profesionales"
echo "   📖 E-books: 7 imágenes profesionales"
echo ""
echo "🔗 Las imágenes ahora están disponibles localmente en:"
echo "   - public/images/courses/"
echo "   - public/images/ebooks/"
echo ""
echo "🎯 Puedes acceder a la página de prueba en:"
echo "   http://localhost:5173/test-shopping"
