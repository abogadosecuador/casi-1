# WilexGameStation - Setup & Play Guide

## 🎮 ¿Qué es WilexGameStation?

Una plataforma retro‑neón futurista con:
- **Intro cinematográfica** completa (balance, túnel, HUB, portal).
- **Dos juegos funcionales**:
  - **Geometry Trial**: Runner tipo Geometry Dash con 3 saltos, obstáculos, dificultades (Easy/Normal/Hard).
  - **Justice Module**: 8 microcasos sobre igualdad, transparencia y derecho a ser oído.
- **Sistema de progresión**: Tokens, XP, niveles, mejores puntuaciones.
- **Tienda de cosméticos**: Compra skins de cubo, patrones y temas con tokens.
- **Misiones/Quests**: Objetivos diarios para ganar bonus.
- **HUB central**: Menú principal con acceso a todo.

---

## 🚀 Instalación (SOLO UNA VEZ)

### 1. Instalar Node.js (incluye npm)

1. Ve a: **https://nodejs.org**
2. Descarga la versión **LTS** (recomendada).
3. Ejecuta el instalador:
   - ✅ Marca la opción de instalar **npm**.
   - ✅ Acepta agregar Node al **PATH**.
4. Cierra y vuelve a abrir PowerShell/terminal.

### 2. Verificar instalación

En PowerShell:

```powershell
node -v
npm -v
```

Si ves números de versión, ¡está listo!

### 3. Instalar dependencias del proyecto

En PowerShell, dentro de la carpeta del proyecto:

```powershell
cd "C:\Users\Usuario\Downloads\introwilexgamestation"
npm install
```

Esto descargará React, Framer Motion, Lucide Icons, etc. (solo una vez).

---

## ▶️ Ejecutar el proyecto

En PowerShell, en la misma carpeta:

```powershell
npm run dev
```

Vite te mostrará algo como:

```
  Local:   http://localhost:5173/
```

Abre esa URL en tu navegador (Chrome, Firefox, Edge, etc.).

---

## 🎯 Cómo jugar

### Pantalla inicial
- Pulsa **"Initialize System"** para comenzar la intro.

### Intro (automática)
- Verás una secuencia cinematográfica:
  - Escala de justicia (balance).
  - Túnel con plataformas retro.
  - HUB central futurista con logo WGS.
  - Portal RGB de entrada.

### HUB Principal (después de la intro)
Aquí puedes:

#### 1. **GEOMETRY TRIAL** 🎮
- Elige dificultad: **Easy** (10 tokens) / **Normal** (25) / **Hard** (50).
- Salta hasta 3 veces para esquivar obstáculos.
- Gana tokens y XP según tu score.
- Mejor puntuación se guarda.

#### 2. **JUSTICE MODULE** ⚖️
- Resuelve 8 microcasos sobre igualdad y derecho.
- Elige la respuesta más justa.
- Gana tokens/XP por aciertos.
- Módulos progresivos (1, 2, 3).

#### 3. **🛍️ STORE**
- Compra cosméticos con tokens:
  - **Skins de cubo**: colores, patrones.
  - **Temas**: oscuro, claro.
- Equipa lo que compres.

#### 4. **⚡ MISSIONS**
- Objetivos como:
  - "Llega a score 300 en Geometry Trial".
  - "Resuelve 8 casos correctamente".
  - "Sube a nivel 5".
- Completa para ganar bonus.

#### 5. **RUN INTRO**
- Relanza la secuencia cinematográfica.

---

## 📊 Sistema de progresión

- **LEVEL**: Sube con XP (500 XP = 1 nivel).
- **TOKENS**: Moneda interna. Gana jugando, gasta en tienda.
- **XP**: Experiencia. Acumula para subir nivel.
- **BEST SCORE**: Tu mejor puntuación en cualquier juego.

---

## 🎨 Características técnicas

- **Estética retro‑neón**: Gradientes, blur, glow, tipografía futurista.
- **Animaciones suaves**: Framer Motion para transiciones fluidas.
- **Responsive**: Funciona en desktop y móvil.
- **Sin backend**: Todo local. Datos guardados en memoria (se pierden al recargar).
- **Sin pagos reales**: Tokens solo dentro del juego.

---

## 🛠️ Troubleshooting

### "npm: El término 'npm' no se reconoce..."
→ Instala Node.js desde https://nodejs.org

### "Cannot find module 'react'..."
→ Ejecuta `npm install` en la carpeta del proyecto.

### "Port 5173 already in use..."
→ Otro proceso usa ese puerto. Ejecuta:
```powershell
npm run dev -- --port 5174
```

### "Cambios no se guardan al recargar..."
→ Normal. El perfil se guarda en memoria. Para persistencia real, necesitarías un backend.

---

## 📝 Notas finales

- Este proyecto es **completamente funcional** como demostración.
- Puedes extender fácilmente:
  - Más juegos.
  - Más casos legales.
  - Más cosméticos.
  - Backend real para guardar progresos.
- Todo el código está en TypeScript/React, bien estructurado y comentado.

---

## 🎮 ¡Diviértete!

Pulsa **"Initialize System"** y disfruta de WilexGameStation. 🚀
