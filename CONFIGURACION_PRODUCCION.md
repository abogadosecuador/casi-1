# 🚀 CONFIGURACIÓN PARA PRODUCCIÓN

## Sistema de Pagos y Compras Real - Sin Simulación

---

## 📋 REQUISITOS PREVIOS

### 1. Node.js y npm
```bash
node --version  # v18 o superior
npm --version   # v9 o superior
```

### 2. Cuenta de Supabase
- Crear proyecto en https://supabase.com
- Obtener URL y claves API

### 3. Cuenta de Stripe (Pagos con Tarjeta)
- Crear cuenta en https://stripe.com
- Obtener claves API (Secret Key y Publishable Key)

### 4. Cuenta de PayPal (Ya configurada)
- Client ID ya está configurado en el código
- Para producción, actualizar a credenciales reales

---

## ⚙️ CONFIGURACIÓN PASO A PASO

### PASO 1: Configurar Base de Datos (Supabase)

1. **Ir a Supabase Dashboard:**
   - https://app.supabase.com

2. **Crear nuevo proyecto:**
   - Nombre: "abogado-wilson"
   - Región: South America (más cercana)
   - Contraseña fuerte

3. **Ejecutar Schema SQL:**
   ```sql
   -- Copiar y ejecutar el contenido de: database/schema.sql
   -- En: SQL Editor de Supabase
   ```

4. **Obtener credenciales:**
   - Settings → API
   - Copiar:
     * Project URL
     * Anon Key
     * Service Role Key (¡NUNCA compartir!)

### PASO 2: Configurar Variables de Entorno

1. **Crear archivo `.env` en la raíz del proyecto:**
   ```bash
   cp .env.example .env
   ```

2. **Editar `.env` con tus credenciales:**
   ```env
   # Supabase
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   SUPABASE_SERVICE_KEY=tu_service_key
   
   # Stripe
   STRIPE_SECRET_KEY=sk_live_tu_stripe_secret
   STRIPE_PUBLISHABLE_KEY=pk_live_tu_stripe_public
   STRIPE_WEBHOOK_SECRET=whsec_tu_webhook
   
   # Backend
   PORT=3001
   NODE_ENV=production
   VITE_BACKEND_URL=http://localhost:3001/api
   ```

### PASO 3: Instalar Dependencias

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### PASO 4: Configurar Stripe

1. **Crear cuenta en Stripe:**
   - https://dashboard.stripe.com/register

2. **Activar modo producción:**
   - Dashboard → Developers → API Keys
   - Copiar: Secret Key y Publishable Key

3. **Configurar Webhook:**
   - Dashboard → Developers → Webhooks
   - Añadir endpoint: `https://tu-dominio.com/api/webhook/stripe`
   - Seleccionar eventos:
     * payment_intent.succeeded
     * payment_intent.payment_failed
   - Copiar Signing Secret

### PASO 5: Configurar PayPal para Producción

1. **Ir a PayPal Developer:**
   - https://developer.paypal.com

2. **Cambiar a modo Live:**
   - Dashboard → Apps & Credentials
   - Switch to Live

3. **Crear App de Producción:**
   - Create App
   - Nombre: "Abogado Wilson E-commerce"
   - Copiar Client ID y Secret

4. **Actualizar en código:**
   ```javascript
   // src/components/Payment/PayPalButton.jsx
   const initialOptions = {
     'client-id': 'TU_CLIENT_ID_PRODUCCION',
     currency: 'USD',
     intent: 'capture',
   };
   ```

---

## 🚀 INICIAR SISTEMA

### Opción 1: Iniciar Todo (Recomendado)

**Crear archivo `INICIAR_TODO.bat`:**
```batch
@echo off
echo Iniciando Backend...
start cmd /k "cd backend && npm start"
timeout /t 3
echo Iniciando Frontend...
start cmd /k "npm run dev"
echo Sistema iniciado!
pause
```

### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 🔒 SEGURIDAD

### 1. Variables de Entorno
- ❌ NUNCA commitear `.env` a Git
- ✅ Usar `.env.example` como plantilla
- ✅ Agregar `.env` a `.gitignore`

### 2. Claves API
- ❌ NUNCA exponer Service Role Key en frontend
- ✅ Usar Anon Key solo en frontend
- ✅ Service Key solo en backend

### 3. Validación de Pagos
- ✅ Siempre verificar en backend
- ✅ No confiar solo en frontend
- ✅ Validar montos y productos

---

## ✅ VERIFICACIÓN DEL SISTEMA

### 1. Health Check del Backend
```bash
curl http://localhost:3001/api/health
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "API funcionando correctamente",
  "timestamp": "2025-10-08T19:00:00.000Z",
  "environment": "production"
}
```

### 2. Verificar Conexión a Supabase
```javascript
// Desde consola del navegador
const { data, error } = await window.supabase
  .from('products')
  .select('*')
  .limit(1);
console.log('Supabase:', data, error);
```

### 3. Test de Compra

1. Abrir: http://localhost:5173/tienda
2. Agregar producto al carrito
3. Ir a checkout
4. Completar información
5. Pagar con PayPal o Tarjeta
6. Verificar en Supabase:
   ```sql
   SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;
   SELECT * FROM purchases ORDER BY created_at DESC LIMIT 5;
   ```

---

## 🔄 SISTEMA DE SUSCRIPCIONES

### Verificación Automática (Ya configurado)

El backend verifica automáticamente cada hora las suscripciones expiradas y corta el acceso.

**Verificación manual:**
```bash
curl -X POST http://localhost:3001/api/check-subscriptions
```

### Flujo de Suscripción

1. **Usuario compra plan:**
   - Se crea registro en `purchases`
   - Se crea registro en `subscriptions` con fecha de expiración
   - Se otorga acceso en `user_products`

2. **Durante suscripción activa:**
   - Usuario tiene acceso completo
   - Estado: `active`

3. **Al expirar:**
   - Cron job detecta expiración
   - Cambia estado a `expired`
   - Revoca acceso en `user_products`
   - Usuario pierde acceso automáticamente

---

## 📊 MONITOREO

### Logs del Backend
```bash
cd backend
npm start
# Ver logs en tiempo real
```

### Logs de Supabase
- Dashboard → Logs
- Ver queries y errores en tiempo real

### Webhook Stripe
- Dashboard → Webhooks
- Ver eventos recibidos

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot connect to backend"
**Solución:**
```bash
# Verificar que backend esté corriendo
netstat -ano | findstr :3001

# Si no está, iniciar:
cd backend
npm start
```

### Error: "Supabase connection failed"
**Solución:**
1. Verificar `.env` tiene las credenciales correctas
2. Verificar proyecto Supabase está activo
3. Verificar firewall no bloquea conexión

### Error: "Payment failed"
**Solución:**
1. Verificar claves de Stripe/PayPal son correctas
2. Verificar modo (sandbox vs producción) coincide
3. Ver logs del backend para detalles

### Error: "Subscription not expiring"
**Solución:**
```bash
# Ejecutar manualmente verificación
curl -X POST http://localhost:3001/api/check-subscriptions

# Verificar en base de datos
SELECT * FROM subscriptions 
WHERE status = 'active' 
AND expiration_date < NOW();
```

---

## 📱 TESTING DE PAGOS

### Stripe Test Cards
```
Tarjeta de prueba exitosa: 4242 4242 4242 4242
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
```

### PayPal Sandbox
```
Email: sb-test@example.com
Password: test123456
```

---

## 🌐 DEPLOYMENT A PRODUCCIÓN

### Frontend (Vercel/Netlify)

1. **Conectar repositorio Git**
2. **Configurar variables de entorno:**
   ```
   VITE_SUPABASE_URL=tu_url
   VITE_SUPABASE_ANON_KEY=tu_key
   VITE_BACKEND_URL=https://tu-backend.com/api
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```
3. **Deploy automático en cada push**

### Backend (Railway/Heroku/DigitalOcean)

1. **Subir código a Git**
2. **Configurar variables de entorno**
3. **Iniciar con:** `npm start`
4. **Configurar dominio:**
   ```
   https://api.tudominio.com
   ```

### Actualizar URLs

**En `.env`:**
```env
VITE_BACKEND_URL=https://api.tudominio.com/api
```

**En Stripe Webhook:**
```
https://api.tudominio.com/api/webhook/stripe
```

---

## 📋 CHECKLIST FINAL

Antes de lanzar a producción:

- [ ] Base de datos Supabase configurada
- [ ] Schema SQL ejecutado
- [ ] Stripe configurado (modo producción)
- [ ] PayPal configurado (modo producción)
- [ ] Variables de entorno configuradas
- [ ] Backend corriendo sin errores
- [ ] Frontend corriendo sin errores
- [ ] Test de compra exitoso
- [ ] Verificación de suscripciones funciona
- [ ] Webhooks de Stripe configurados
- [ ] SSL/HTTPS habilitado
- [ ] Logs de errores monitoreados
- [ ] Backup de base de datos configurado

---

## 📞 SOPORTE

Si encuentras problemas:

1. Revisar logs del backend
2. Revisar consola del navegador (F12)
3. Verificar base de datos en Supabase
4. Verificar webhooks en Stripe/PayPal

---

## 🎯 FLUJO COMPLETO DE COMPRA

```
Usuario selecciona producto
    ↓
Agrega al carrito
    ↓
Va a checkout
    ↓
Completa información
    ↓
Selecciona método de pago
    ↓
[STRIPE/PAYPAL] Procesa pago
    ↓
Backend verifica pago ✓
    ↓
Crea orden en DB
    ↓
Crea purchase en DB
    ↓
Otorga acceso en user_products
    ↓
Si es suscripción → crea en subscriptions
    ↓
Usuario recibe confirmación
    ↓
Acceso inmediato al producto
```

---

**¡SISTEMA LISTO PARA PRODUCCIÓN!** 🚀

Todo configurado para:
- ✅ Pagos reales con Stripe y PayPal
- ✅ Base de datos persistente
- ✅ Suscripciones con corte automático
- ✅ Sistema de compras completo
- ✅ Registro de usuarios
- ✅ Formularios de contacto
- ✅ Sin simulaciones - Todo funcional

*Última actualización: 2025-10-08*
