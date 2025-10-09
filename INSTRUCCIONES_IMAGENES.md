# 📸 INSTRUCCIONES PARA AGREGAR IMÁGENES PROFESIONALES

## 🎯 Estructura de Carpetas Necesaria

```
public/
  images/
    courses/           ← Imágenes de cursos
    ebooks/            ← Portadas de ebooks
    products/          ← Imágenes de productos
    blog/              ← Ya existe
```

---

## 📐 ESPECIFICACIONES POR TIPO

### 🎓 Cursos (courses/)
- **Dimensiones**: 400x300px (ratio 4:3)
- **Formato**: JPG o WebP
- **Peso máximo**: 200KB
- **Estilo**: Profesional, relacionado con derecho/educación
- **Ejemplos de nombres**:
  - `derecho-penal.jpg`
  - `contratos.jpg`
  - `litigacion.jpg`
  - `laboral.jpg`
  - `transito.jpg`
  - `aduanero.jpg`
  - `default.jpg` ← Imagen por defecto

### 📚 Ebooks (ebooks/)
- **Dimensiones**: 300x400px (ratio portada de libro)
- **Formato**: JPG o WebP
- **Peso máximo**: 150KB
- **Estilo**: Portada de libro profesional
- **Ejemplos de nombres**:
  - `ebook-emprendedores.jpg`
  - `ebook-derechos.jpg`
  - `ebook-familia.jpg`
  - `ebook-contratos.jpg`
  - `ebook-penal.jpg`
  - `default.jpg` ← Portada por defecto

### 🛍️ Productos/Servicios (products/)
- **Dimensiones**: 400x400px (cuadrado)
- **Formato**: JPG o WebP
- **Peso máximo**: 200KB
- **Estilo**: Icono o representación del servicio
- **Ejemplos de nombres**:
  - `consulta-legal.jpg`
  - `asesoria.jpg`
  - `default.jpg`

---

## 🔧 OPCIÓN 1: Usar Imágenes Reales (Recomendado)

### Fuentes Gratuitas de Imágenes Profesionales:
1. **Unsplash**: https://unsplash.com/
   - Buscar: "law", "education", "books", "justice"
   
2. **Pexels**: https://www.pexels.com/
   - Buscar: "lawyer", "legal", "study", "library"
   
3. **Pixabay**: https://pixabay.com/
   - Buscar: "courthouse", "law books", "legal documents"

### Herramientas para Redimensionar:
- **Online**: https://www.iloveimg.com/resize-image
- **Photoshop/GIMP**: Redimensionar manualmente
- **Canva**: https://www.canva.com/ (plantillas de portadas)

### Pasos:
1. Descargar imagen de alta calidad
2. Redimensionar según especificaciones
3. Optimizar peso (comprimir)
4. Renombrar según el producto
5. Colocar en la carpeta correspondiente

---

## 🎨 OPCIÓN 2: Usar Placeholders con IA

### Generadores de Imágenes con IA:
1. **Midjourney** o **DALL-E**: Para portadas personalizadas
2. **Leonardo.ai**: Gratis, buena calidad
3. **Canva AI**: Integrado en Canva

### Prompts Sugeridos:

**Para Cursos:**
```
"Professional legal education course thumbnail, modern design, 
scales of justice, law books, clean background, 
high quality, 4k"
```

**Para Ebooks:**
```
"Professional book cover design, legal topic, 
minimalist style, navy blue and gold colors, 
modern typography, 3D render"
```

---

## 🚀 OPCIÓN 3: Usar el Sistema de Fallback (Actual)

Si NO agregas imágenes, el sistema ya tiene un **fallback profesional** que muestra:
- Gradiente de color según tipo
- Icono representativo
- Nombre del producto

**Esto funciona perfectamente** pero las imágenes reales mejoran la presentación.

---

## 📦 QUICK START - Comando para Crear Carpetas

```powershell
# Ejecutar en PowerShell desde la raíz del proyecto
New-Item -ItemType Directory -Force -Path "public\images\courses"
New-Item -ItemType Directory -Force -Path "public\images\ebooks"
New-Item -ItemType Directory -Force -Path "public\images\products"
```

O manualmente:
1. Ir a `public/images/`
2. Crear carpetas: `courses`, `ebooks`, `products`
3. Colocar imágenes dentro

---

## ✅ VERIFICAR QUE FUNCIONA

1. Agregar imagen en la carpeta correspondiente
2. Actualizar el curso/ebook/producto con la ruta:
   ```javascript
   imageUrl: '/images/courses/derecho-penal.jpg'
   ```
3. Refrescar navegador (Ctrl + F5)
4. La imagen debe aparecer

---

## 🎨 PALETA DE COLORES SUGERIDA

Para mantener consistencia visual:

### Cursos:
- Azul: `#2563eb` (Blue-600)
- Azul oscuro: `#1e40af` (Blue-700)

### Ebooks:
- Púrpura: `#9333ea` (Purple-600)
- Púrpura oscuro: `#7e22ce` (Purple-700)

### Servicios:
- Verde: `#16a34a` (Green-600)
- Verde oscuro: `#15803d` (Green-700)

---

## 📝 EJEMPLO DE PORTADA DE EBOOK CON CANVA

1. Ir a Canva: https://www.canva.com/
2. Buscar "Book Cover" o "Portada de Libro"
3. Seleccionar template profesional
4. Cambiar título y colores
5. Descargar como JPG (300x400px)
6. Guardar en `public/images/ebooks/`

---

## 🔗 RECURSOS ÚTILES

- **Compresión de imágenes**: https://tinypng.com/
- **Crear mockups de libros**: https://placeit.net/
- **Iconos legales**: https://www.flaticon.com/
- **Generador de gradientes**: https://cssgradient.io/

---

## ⚠️ IMPORTANTE

- **NO usar imágenes con copyright** sin permiso
- **Siempre optimizar** el peso de las imágenes
- **Usar nombres descriptivos** en minúsculas con guiones
- **Mantener consistencia** en dimensiones

---

*Última actualización: 2025-10-08*
