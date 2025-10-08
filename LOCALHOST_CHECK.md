# ✅ CHECKLIST DE VERIFICACIÓN LOCALHOST

## 🚀 Inicio Rápido

### 1. Ejecutar Script de Verificación
```powershell
.\verificar-localhost.ps1
```

Este script verifica:
- ✅ Node.js y npm
- ✅ Dependencias instaladas
- ✅ Variables de entorno
- ✅ Archivos principales
- ✅ Servicios implementados
- ✅ Componentes UI
- ✅ Compilación TypeScript
- ✅ Puerto disponible

### 2. Si Hay Problemas

#### Dependencias no instaladas
```bash
npm install
```

#### Variables de entorno faltantes
Verifica que `.env` contenga:
```env
VITE_SUPABASE_URL=https://phzldiaohelbyobhjrnc.supabase.co
VITE_SUPABASE_KEY=sbp_db5898ecc094d37ec87562399efe3833e63ab20f
```

#### Puerto 3000 ocupado
```bash
# El servidor automáticamente usará otro puerto (3001, 3002, etc.)
npm run dev
```

---

## 🔍 Verificación Manual Paso a Paso

### 1. Verificar Node.js
```bash
node --version
# Debe ser v18 o superior
```

### 2. Verificar npm
```bash
npm --version
# Cualquier versión reciente
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Verificar Servicios Creados
```bash
# Estos archivos deben existir:
src/services/ordersService.ts
src/services/courseProgressService.ts
src/services/newsletterService.ts
src/services/notificationService.ts
```

### 5. Verificar Componentes
```bash
# Estos archivos deben existir:
src/components/Effects/CursorGlow.tsx
src/components/Effects/FloatingCard3D.tsx
src/components/Dashboard/EnhancedClientDashboard.tsx
src/components/Notifications/NotificationDropdown.tsx
```

### 6. Verificar Migración de BD
```bash
# Este archivo debe existir:
supabase/migrations/20250108_complete_platform.sql
```

---

## 🎯 Funcionalidades a Probar en Localhost

### 1. Autenticación ✅
- [ ] Registro de usuario
- [ ] Login
- [ ] Logout
- [ ] Persistencia de sesión

**Ruta:** `http://localhost:3000/register` o `/login`

### 2. Efectos Visuales ✅
- [ ] Cursor glow (mover el mouse)
- [ ] Tarjetas 3D (hover sobre cards)
- [ ] Animación typewriter (página de inicio)
- [ ] Modo oscuro/claro (toggle en header)

**Ruta:** `http://localhost:3000/`

### 3. Carrito de Compras ✅
- [ ] Agregar productos al carrito
- [ ] Ver carrito
- [ ] Actualizar cantidades
- [ ] Persistencia (recargar página)

**Rutas:** 
- Catálogo: `http://localhost:3000/catalog`
- Cursos: `http://localhost:3000/courses`
- Productos: `http://localhost:3000/products`

### 4. Checkout y Pagos ✅
- [ ] Ver resumen de orden
- [ ] Aplicar créditos
- [ ] Seleccionar método de pago
- [ ] Procesar orden (simula pago)

**Ruta:** `http://localhost:3000/checkout`

### 5. Dashboard Cliente ✅
- [ ] Ver estadísticas
- [ ] Historial de compras
- [ ] Cursos con progreso
- [ ] Certificados

**Ruta:** `http://localhost:3000/dashboard`

### 6. Cursos ✅
- [ ] Ver catálogo de cursos
- [ ] Ver detalles de curso
- [ ] Completar lecciones (si tienes acceso)
- [ ] Ver progreso

**Rutas:**
- Catálogo: `http://localhost:3000/courses`
- Detalle: `http://localhost:3000/courses/:id`
- Mis cursos: `http://localhost:3000/dashboard/my-courses`

### 7. Blog ✅
- [ ] Ver posts
- [ ] Leer post completo
- [ ] Buscar posts
- [ ] Comentar (requiere login)

**Rutas:**
- Blog: `http://localhost:3000/blog`
- Post: `http://localhost:3000/blog/:slug`

### 8. Newsletter ✅
- [ ] Suscribirse
- [ ] Confirmar suscripción
- [ ] Cancelar suscripción

**Componente:** Footer de cualquier página

### 9. Notificaciones ✅
- [ ] Ver notificaciones (icono campana)
- [ ] Marcar como leída
- [ ] Ver contador de no leídas

**Ubicación:** Header (esquina superior derecha)

### 10. Servicios Legales ✅
- [ ] Ver servicios disponibles
- [ ] Agendar consulta
- [ ] Ver calendario

**Rutas:**
- Servicios: `http://localhost:3000/services`
- Calendario: `http://localhost:3000/calendar`

---

## 🐛 Problemas Comunes y Soluciones

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 is already in use"
```bash
# Vite automáticamente usará el siguiente puerto disponible
# O mata el proceso en el puerto 3000:
npx kill-port 3000
npm run dev
```

### Error: Supabase connection
```bash
# Verifica .env
cat .env

# Debe contener:
VITE_SUPABASE_URL=https://phzldiaohelbyobhjrnc.supabase.co
VITE_SUPABASE_KEY=sbp_...
```

### Error: TypeScript errors
```bash
# Son normales algunos warnings de tipado
# Si hay errores críticos:
npm run typecheck

# Para ignorar y ejecutar:
npm run dev
```

### Página en blanco
```bash
# Abre la consola del navegador (F12)
# Busca errores en rojo
# Verifica que todos los archivos existan
```

---

## 📊 Estado de Servicios

### Backend Services ✅
- [x] **ordersService** - Órdenes y pagos
- [x] **courseProgressService** - Cursos y certificados
- [x] **newsletterService** - Blog y newsletter
- [x] **notificationService** - Notificaciones

### Componentes UI ✅
- [x] **CursorGlow** - Efecto de cursor
- [x] **FloatingCard3D** - Tarjetas 3D
- [x] **EnhancedClientDashboard** - Dashboard cliente
- [x] **NotificationDropdown** - Notificaciones

### Hooks Personalizados ✅
- [x] **useOrders** - Gestión de órdenes
- [x] **useNotifications** - Notificaciones reactivas

---

## 🔄 Flujo de Prueba Completo

### Escenario 1: Comprar un Curso

1. **Navegar al catálogo**
   ```
   http://localhost:3000/courses
   ```

2. **Seleccionar un curso**
   - Click en "Ver Curso"

3. **Agregar al carrito**
   - Click en "Agregar al Carrito"
   - Ver badge del carrito actualizado

4. **Ir al checkout**
   - Click en icono del carrito
   - Click en "Proceder al Pago"

5. **Completar compra**
   - Seleccionar método de pago
   - Click en "Pagar con Tarjeta" o "PayPal"
   - Ver confirmación

6. **Verificar en dashboard**
   ```
   http://localhost:3000/dashboard/my-courses
   ```
   - El curso debe aparecer con progreso 0%

### Escenario 2: Progresar en un Curso

1. **Ir a Mis Cursos**
   ```
   http://localhost:3000/dashboard/my-courses
   ```

2. **Abrir curso**
   - Click en "Continuar"

3. **Completar lecciones**
   - Ver contenido de lección
   - Marcar como completada
   - Ver barra de progreso actualizada

4. **Al 100%**
   - Certificado generado automáticamente
   - Notificación recibida
   - Disponible en Dashboard → Certificados

### Escenario 3: Suscribirse a Newsletter

1. **Ir al footer**
   - Cualquier página

2. **Ingresar email**
   - Formulario de newsletter

3. **Confirmar**
   - Ver mensaje de éxito
   - Verificar en BD (Supabase)

---

## 🎨 Verificar Efectos Visuales

### Cursor Glow
1. Abrir cualquier página
2. Mover el mouse
3. Debe verse un resplandor azul/morado siguiendo el cursor

### Tarjetas 3D
1. Ir a página de inicio o dashboard
2. Pasar el mouse sobre las cards
3. Deben inclinarse según posición del mouse

### Typewriter
1. Ir a página de inicio
2. Ver el título principal
3. Debe escribir/borrar texto automáticamente

### Dark Mode
1. Click en toggle de tema (luna/sol)
2. Toda la UI debe cambiar
3. Preferencia se guarda en localStorage

---

## ✅ Checklist Final

Antes de considerar que localhost está 100% funcional:

- [ ] Script de verificación ejecutado sin errores críticos
- [ ] Servidor inicia correctamente (`npm run dev`)
- [ ] Página de inicio carga sin errores
- [ ] Autenticación funciona (registro/login)
- [ ] Carrito persiste entre recargas
- [ ] Checkout procesa órdenes
- [ ] Dashboard muestra datos correctamente
- [ ] Efectos visuales funcionan
- [ ] Notificaciones aparecen
- [ ] Tema oscuro/claro funciona
- [ ] Navegación entre páginas fluida
- [ ] Console sin errores críticos

---

## 📝 Notas Importantes

### Base de Datos
⚠️ **Importante:** Las migraciones SQL deben ejecutarse en Supabase antes de que ciertas funcionalidades (como cursos, órdenes, certificados) funcionen completamente.

**Para ejecutar migraciones:**
1. Ir a https://app.supabase.com
2. Seleccionar tu proyecto
3. SQL Editor
4. Pegar contenido de `supabase/migrations/20250108_complete_platform.sql`
5. Run

### Datos de Prueba
Para probar la plataforma, puedes:
1. Registrar un usuario de prueba
2. Los datos del catálogo se cargan desde localStorage
3. Para reset: `localStorage.clear()` en console

### Modo Desarrollo
En localhost:
- Los pagos son simulados (no se procesa dinero real)
- Stripe/PayPal están en modo test
- Certificados se generan instantáneamente

---

## 🚀 Listo para Producción

Una vez todo funcione en localhost:

1. **Ejecutar build**
   ```bash
   npm run build
   ```

2. **Preview de producción**
   ```bash
   npm run preview
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

---

**¡Tu plataforma está lista para ser probada en localhost!** 🎉
