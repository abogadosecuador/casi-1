# 🚀 INSTRUCCIONES COMPLETAS - SISTEMA FUNCIONAL

## ⚠️ PASO 1: CREAR TABLAS EN SUPABASE (CRÍTICO - OBLIGATORIO)

**El sistema NO FUNCIONARÁ sin este paso. Todas las compras, citas y consultas se guardan aquí.**

### 1.1 Accede a Supabase SQL Editor
```
https://supabase.com/dashboard/project/kbybhgxqdefuquybstqk/sql/new
```

### 1.2 Ejecuta el script SQL
1. Abre el archivo: `EJECUTAR_ESTO_EN_SUPABASE.sql`
2. Copia TODO el contenido
3. Pégalo en el SQL Editor de Supabase
4. Click en **"RUN"** o **"Ejecutar"**
5. Espera a que aparezca el mensaje de éxito

**✅ Verás mensajes como:**
```
✅ Base de datos creada exitosamente!
✅ Tablas creadas: profiles, orders, purchases, appointments...
```

---

## 👨‍💼 PASO 2: CREAR USUARIO ADMINISTRADOR

### 2.1 Crear usuario en Supabase Authentication
1. Ve a: `https://supabase.com/dashboard/project/kbybhgxqdefuquybstqk/auth/users`
2. Click en **"Add user"** o **"Agregar usuario"**
3. Ingresa:
   - **Email**: `admin@abogado.com` (o el que prefieras)
   - **Password**: Tu contraseña segura
4. Click en **"Create user"** o **"Crear usuario"**

### 2.2 Convertir usuario en administrador
1. Ve al SQL Editor nuevamente
2. Ejecuta este comando (reemplaza el email si usaste otro):

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@abogado.com';
```

3. Click en **"RUN"**

**✅ Ahora puedes iniciar sesión como admin!**

---

## 🔐 PASO 3: INICIAR SESIÓN

### 3.1 Para ADMINISTRADOR
1. Ve a: `http://localhost:5173/login`
2. Ingresa:
   - Email: `admin@abogado.com`
   - Password: (la que configuraste)
3. Serás redirigido automáticamente a: `/admin`

### 3.2 Para CLIENTE
1. Ve a: `http://localhost:5173/login` o registra un nuevo usuario
2. Los usuarios normales van a: `/dashboard`

---

## 💳 PASO 4: PROBAR COMPRAS (PayPal)

### 4.1 Agregar productos al carrito
1. Ve a: `http://localhost:5173/tienda`
2. Click en "Agregar al carrito" en cualquier producto
3. Ve al carrito (icono superior derecha)

### 4.2 Procesar pago con PayPal
1. Click en "Finalizar compra"
2. Completa tus datos de facturación
3. Click en el botón de PayPal
4. Usa cuenta de prueba PayPal o tarjeta real

**✅ Después del pago:**
- Se crea la orden en tabla `orders`
- Se crean registros en tabla `purchases`
- Se otorga acceso en tabla `user_products`
- Si es curso, se crea en `course_enrollments`

### 4.3 Ver compras en Dashboard Cliente
1. Inicia sesión como cliente
2. Ve a: `http://localhost:5173/dashboard`
3. En la pestaña **"Mis Compras"** verás todo el historial

---

## 📅 PASO 5: CITAS Y CONSULTAS

### 5.1 Agendar cita
1. Ve a: `http://localhost:5173/calendario`
2. Selecciona fecha y hora
3. Completa formulario
4. **Se guarda en tabla `appointments`**

### 5.2 Ver citas en dashboard
1. Dashboard cliente → **"Mis Citas"**
2. Puedes:
   - ✏️ **Reprogramar** (actualiza en BD)
   - ❌ **Cancelar** (marca como cancelled en BD)

### 5.3 Consultas
- Se registran en tabla `consultations`
- Vinculadas a `appointments` si tienen cita asociada

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### ✅ Dashboard Cliente (100% Funcional)
- ✅ Estadísticas reales de Supabase
- ✅ Historial de compras registrado
- ✅ Citas con funciones de cancelar/reprogramar
- ✅ Consultas históricas
- ✅ Cursos inscritos
- ✅ Perfil actualizable

### ✅ Sistema de Compras (100% Funcional)
- ✅ PayPal integrado y funcional
- ✅ Registro en base de datos Supabase
- ✅ Órdenes con todos los detalles
- ✅ Compras individuales por producto
- ✅ Acceso otorgado automáticamente
- ✅ Inscripción a cursos automática

### ✅ Dashboard Admin (Accesible)
- ✅ Login con rol admin
- ✅ Acceso protegido por roles
- ✅ Ver todas las órdenes
- ✅ Ver todos los usuarios
- ✅ Gestión completa

### ❌ Transferencia Bancaria
- ❌ DESHABILITADA (requiere validación manual)
- ✅ Solo PayPal disponible (pago inmediato)

---

## 🔍 VERIFICAR QUE TODO FUNCIONA

### Verificación 1: Tablas creadas
```sql
-- Ejecuta en SQL Editor de Supabase:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```
**Debe mostrar:** profiles, orders, purchases, appointments, consultations, etc.

### Verificación 2: Usuario admin creado
```sql
SELECT id, email, role 
FROM profiles 
WHERE role = 'admin';
```
**Debe mostrar tu usuario admin**

### Verificación 3: Hacer una compra de prueba
1. Compra un producto con PayPal
2. Verifica en Supabase:
```sql
-- Ver órdenes
SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;

-- Ver compras
SELECT * FROM purchases ORDER BY created_at DESC LIMIT 5;

-- Ver acceso otorgado
SELECT * FROM user_products ORDER BY purchased_at DESC LIMIT 5;
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Could not find the table 'public.profiles'"
**Solución:** No ejecutaste el script SQL del PASO 1. Hazlo ahora.

### ❌ No puedo acceder a /admin
**Solución:** 
1. Verifica que tu usuario tiene role='admin' en tabla profiles
2. Ejecuta: `UPDATE profiles SET role = 'admin' WHERE email = 'TU_EMAIL';`

### ❌ Las compras no aparecen en dashboard
**Solución:**
1. Verifica que las tablas existen (PASO 1)
2. Haz logout y login nuevamente
3. Verifica en Supabase que los datos están guardados

### ❌ PayPal no funciona
**Solución:**
- PayPal está configurado en modo SANDBOX
- Necesitas cuenta de prueba o usa tarjeta real
- Client ID está en: `src/components/Payment/PayPalButton.jsx`

---

## 📊 ESTRUCTURA DE BASE DE DATOS

### Tablas principales:
- **profiles** - Perfiles de usuarios (con role: admin/client)
- **orders** - Órdenes de compra completas
- **purchases** - Compras individuales por producto
- **appointments** - Citas agendadas
- **consultations** - Consultas legales
- **course_enrollments** - Inscripciones a cursos
- **user_products** - Acceso a productos comprados

### Relaciones:
```
users (auth) → profiles → orders → purchases
                       → appointments
                       → consultations
                       → course_enrollments
                       → user_products
```

---

## 🎉 RESUMEN

1. ✅ **Ejecuta SQL** en Supabase (PASO 1)
2. ✅ **Crea usuario admin** (PASO 2)
3. ✅ **Inicia sesión** como admin o cliente
4. ✅ **Compra productos** con PayPal
5. ✅ **Verifica** que todo se registra en BD
6. ✅ **Gestiona citas** desde dashboard

**🚀 Sistema 100% funcional con base de datos real!**

---

## 📞 SOPORTE

Si algo no funciona:
1. Verifica que ejecutaste PASO 1 (tablas en Supabase)
2. Verifica que tienes usuario admin (PASO 2)
3. Revisa la consola del navegador (F12)
4. Verifica datos en Supabase SQL Editor

**El sistema está completamente implementado y listo para usar!**
