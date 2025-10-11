# ✅ Rutas de Consultas - Páginas Profesionales Correctas

## 🎯 Páginas Encontradas con Diseño Profesional

### **Consulta Rápida (Imagen 1)**
Archivo: `src/pages/ConsultationTypes/QuickConsultationPage.tsx`

**Características:**
- ⚡ Diseño moderno con fondo naranja/rojo
- ⏱️ "Tiempo de Respuesta: 5-30 min"
- 🕐 "Disponibilidad: 24/7"
- ⭐ "Satisfacción: 99%"
- 📋 **Temas Urgentes:**
  - Detención o arresto
  - Orden judicial urgente
  - Desalojo inmediato
  - Accidente de tránsito
  - Violencia doméstica
  - Embargo urgente
  - Despido inmediato
  - Custodia de menores
- 💬 **Modalidades:** Chat, Videollamada, Teléfono
- 💰 **Paquetes:** Express, Flash, Urgente 24h

### **Derecho Penal (Imagen 2)**
Archivo: `src/pages/ConsultationTypes/PenalConsultationPage.tsx`

**Características:**
- ⚖️ Diseño profesional con fondo rojo
- 📊 **Estadísticas:**
  - 2-6 meses: Duración promedio
  - 92% Éxito: Tasa de Victoria
  - Desde $180: Precio base
  - 400+ casos: Resueltos
- 📝 **Descripción del Servicio** completa
- 💵 **Tarifas:**
  - Consulta Estándar
  - Consulta Urgente
- ✅ **Servicios Incluidos:**
  - Defensa en delitos contra la propiedad
  - Defensa en delitos contra las personas
  - Litigios en delitos económicos y financieros
  - Representación en audiencias y juicios
- 🛡️ **Garantías:**
  - Defensa especializada
  - Atención inmediata
- 📞 Botones: "Solicitar Consulta" y "Contactar por WhatsApp"

### **Consulta Civil**
Archivo: `src/pages/ConsultationTypes/CivilConsultationPage.tsx`

Similar a la página penal pero enfocada en derecho civil.

### **Consulta Empresarial**
Archivo: `src/pages/ConsultationTypes/EmpresarialConsultationPage.tsx`

Página con paquetes empresariales.

### **Consulta Digital/Online**
Archivo: `src/pages/ConsultationTypes/DigitalConsultationPage.tsx`

Consultas 100% online.

---

## 🔧 Rutas Actualizadas en App-ipiales.jsx

```jsx
{/* Consultas - Páginas con diseño profesional */}
<Route path="/consultas" element={<ConsultationsPage />} />
<Route path="/consultas/general" element={<QuickConsultationPage />} />
<Route path="/consultas/rapida" element={<QuickConsultationPage />} />

{/* Consultas específicas con diseño profesional */}
<Route path="/consultas/penal" element={<PenalConsultationPackages />} />
<Route path="/consultas/penales" element={<PenalConsultationPackages />} />
<Route path="/consultas/civil" element={<CivilConsultationPackages />} />
<Route path="/consultas/civiles" element={<CivilConsultationPackages />} />
<Route path="/consultas/empresarial" element={<EmpresarialConsultationPage />} />
<Route path="/consultas/digital" element={<DigitalConsultationPage />} />
```

---

## 📁 Estructura de Archivos

```
src/pages/ConsultationTypes/
├── QuickConsultationPage.tsx ✅ (Consulta Rápida - Imagen 1)
├── PenalConsultationPage.tsx ✅ (Derecho Penal - Imagen 2)
├── CivilConsultationPage.tsx ✅ (Derecho Civil)
├── EmpresarialConsultationPage.tsx ✅ (Consulta Empresarial)
└── DigitalConsultationPage.tsx ✅ (Consulta Online)
```

---

## 🧪 Probar las Rutas

```
http://localhost:5173/consultas/general  → QuickConsultationPage (diseño imagen 1)
http://localhost:5173/consultas/rapida   → QuickConsultationPage (diseño imagen 1)
http://localhost:5173/consultas/penal    → PenalConsultationPage (diseño imagen 2)
http://localhost:5173/consultas/civil    → CivilConsultationPage (similar a penal)
http://localhost:5173/consultas/empresarial → EmpresarialConsultationPage
http://localhost:5173/consultas/digital  → DigitalConsultationPage
```

---

## ✅ Todas las Consultas Implementadas

- ✅ **Consulta Rápida/General** → Diseño profesional con temas urgentes
- ✅ **Consulta Penal** → Diseño profesional con tarifas y garantías
- ✅ **Consulta Civil** → Diseño profesional similar a penal
- ✅ **Consulta Empresarial** → Paquetes empresariales
- ✅ **Consulta Digital** → 100% online

**Todas las páginas tienen el diseño profesional como en las imágenes.**
