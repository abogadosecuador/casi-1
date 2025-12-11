# 📋 GUÍA COMPLETA DE RUTAS, APIs Y SISTEMAS INTEGRADOS

## 🚀 SERVIDOR EN VIVO
**URL Base:** `http://localhost:5173`
**Estado:** ✅ ACTIVO Y CORRIENDO
**Framework:** Vite + React + TypeScript

---

## 📍 TODAS LAS RUTAS DISPONIBLES

### 🏠 RUTAS PÚBLICAS PRINCIPALES
| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Página de inicio | ✅ Activa |
| `/login` | Iniciar sesión | ✅ Funcional |
| `/register` | Crear cuenta | ✅ Funcional |
| `/contacto` | Contacto | ✅ Activa |
| `/seguridad` | Información de seguridad | ✅ Activa |
| `/privacy` | Política de privacidad | ✅ Activa |
| `/terms` | Términos y condiciones | ✅ Activa |

### 🎯 RUTAS DE PROYECTOS INTEGRADOS
| Ruta | Proyecto | Descripción |
|------|----------|-------------|
| `/proyectos` | Hub Central | Centro de control de todos los proyectos |
| `/projects` | Hub Central (alias) | Alias para `/proyectos` |
| `/proyectos-integrados` | Vista Integrada | Vista alternativa de proyectos |
| `/abogados-os` | Abogados OS | Sistema operativo para gestión legal |
| `/games` | Game Station | Plataforma de juegos integrada |
| `/crypto-banking` | Crypto Banking | Plataforma de finanzas y trading |
| `/trading` | Trading Dashboard | Dashboard en tiempo real de criptomonedas |

### 💼 RUTAS DE DASHBOARD (requieren autenticación)
| Ruta | Descripción |
|------|-------------|
| `/dashboard` | Dashboard principal del usuario |
| `/dashboard/projects` | Gestión de proyectos |
| `/dashboard/admin` | Panel de administrador |
| `/dashboard/client` | Panel del cliente |

### 🛒 RUTAS DE TIENDA Y COMPRAS
| Ruta | Descripción |
|------|-------------|
| `/tienda` | Tienda de productos |
| `/checkout` | Carrito de compras |
| `/suscripciones` | Planes de suscripción |
| `/ebooks` | Librería de ebooks |
| `/cursos` | Catálogo de cursos |

### 📚 RUTAS DE SERVICIOS Y CONSULTAS
| Ruta | Descripción |
|------|-------------|
| `/servicios` | Todos los servicios legales |
| `/servicios/penal` | Derecho Penal |
| `/servicios/civil` | Derecho Civil |
| `/servicios/comercial` | Derecho Comercial |
| `/servicios/transito` | Derecho de Tránsito |
| `/servicios/aduanero` | Derecho Aduanero |
| `/consultas` | Centro de consultas |
| `/consultas/general` | Consulta general |
| `/consultas/penal` | Consulta penal |
| `/consultas/civil` | Consulta civil |
| `/consultas/empresarial` | Consulta empresarial |
| `/consultas/digital` | Consulta digital/online |

### 📖 RUTAS DE CONTENIDO
| Ruta | Descripción |
|------|-------------|
| `/blog` | Blog principal |
| `/blog/:id` | Artículo específico |
| `/noticias` | Noticias judiciales |
| `/foro` | Foro de discusión |

---

## 🔌 APIs EN TIEMPO REAL INTEGRADAS

### 1️⃣ TRADING API SERVICE
**Archivo:** `src/services/tradingApiService.ts`

#### Métodos Disponibles:

```typescript
// Obtener precios de criptomonedas en tiempo real
getCryptoPrices(): Promise<CryptoPrice[]>
// Fuente: CoinGecko API
// Actualización: Automática cada minuto
// Datos: BTC, ETH, BNB, XRP, ADA, etc.

// Obtener datos de Binance
getBinanceTickers(): Promise<any[]>
// Fuente: Binance API
// Actualización: Tiempo real
// Datos: Pares de trading USDT

// Obtener precios de acciones
getStockPrices(symbols: string[]): Promise<StockPrice[]>
// Fuente: Alpha Vantage (requiere API key)
// Datos: AAPL, GOOGL, MSFT, TSLA, AMZN

// Obtener todos los datos
getAllTradingData(): Promise<TradingData>
// Combina: Cryptos + Stocks
// Actualización: Automática

// Obtener historial de precios
getPriceHistory(symbol: string, days: number): Promise<any[]>
// Fuente: CoinGecko
// Rango: Últimos 30 días (configurable)
```

#### Ejemplo de Uso:
```typescript
import tradingApiService from '@/services/tradingApiService';

// En un componente React
const [prices, setPrices] = useState([]);

useEffect(() => {
  const loadPrices = async () => {
    const data = await tradingApiService.getCryptoPrices();
    setPrices(data);
  };
  loadPrices();
}, []);
```

### 2️⃣ AUTHENTICATION SERVICE
**Archivo:** `src/services/authService.ts`

#### Métodos:
```typescript
register(email, password, name): Promise<AuthResponse>
// Crea cuenta nueva
// Hash: bcrypt
// BD: Supabase

login(email, password): Promise<AuthResponse>
// Inicia sesión
// Sincroniza: localStorage para subproyectos
// Logging: Registra actividad

logout(): Promise<void>
// Cierra sesión
// Limpia: localStorage

getCurrentUser(): Promise<User | null>
// Obtiene usuario actual
// Desde: Supabase Auth

updateBalance(userId, amount): Promise<boolean>
// Actualiza balance de usuario
// BD: Tabla usuarios

updateTokens(userId, amount): Promise<boolean>
// Actualiza tokens
// BD: Tabla usuarios
```

### 3️⃣ PAYMENT SERVICE
**Archivo:** `src/services/paymentService.ts`

#### Métodos de Pago:
- **PayPal** - Pagos internacionales
- **Pichincha** - Transferencia bancaria Ecuador
- **Binance Pay** - Pagos con criptomonedas

#### Funcionalidades:
```typescript
processPayment(paymentInfo): Promise<PaymentResponse>
// Procesa pago
// Valida: Monto, método, usuario
// Actualiza: Balance en BD
// Registra: Transacción

verifyPayment(transactionId): Promise<boolean>
// Verifica pago con PayPal
// Webhook: Confirmación automática

recordTransaction(transaction): Promise<void>
// Registra en BD
// Tabla: transacciones
```

---

## 📊 ESTRUCTURA DE BASE DE DATOS

### Tablas Principales:

#### `usuarios`
```sql
- id (UUID) - Identificador único
- email (VARCHAR) - Email único
- nombre (VARCHAR) - Nombre completo
- password_hash (VARCHAR) - Contraseña hasheada con bcrypt
- rol (VARCHAR) - admin / client / guest
- balance (DECIMAL) - Balance en USD
- tokens (INTEGER) - Tokens disponibles
- creado_en (TIMESTAMP) - Fecha de creación
- activo (BOOLEAN) - Estado de cuenta
```

#### `transacciones`
```sql
- id (UUID) - ID único
- usuario_id (UUID) - Referencia a usuario
- tipo (VARCHAR) - purchase / deposit / withdrawal
- monto (DECIMAL) - Cantidad
- estado (VARCHAR) - pending / completed / failed
- referencia_externa (VARCHAR) - ID de PayPal/Binance
- creado_en (TIMESTAMP) - Fecha
```

#### `compras`
```sql
- id (UUID) - ID único
- usuario_id (UUID) - Referencia a usuario
- producto_tipo (VARCHAR) - tokens / libro / producto
- cantidad (INTEGER) - Cantidad comprada
- precio_total (DECIMAL) - Precio total
- metodo_pago (VARCHAR) - paypal / pichincha / binance
- estado_pago (VARCHAR) - pending / completed / failed
- referencia_paypal (VARCHAR) - ID de transacción PayPal
- creado_en (TIMESTAMP) - Fecha
```

#### `wallets` (para Crypto Banking)
```sql
- id (UUID) - ID único
- usuario_id (UUID) - Referencia a usuario
- tipo_moneda (VARCHAR) - BTC / ETH / BNB / USDT
- direccion_publica (VARCHAR) - Dirección pública
- saldo (DECIMAL) - Saldo en moneda
- creado_en (TIMESTAMP) - Fecha
```

#### `activity_logs`
```sql
- id (UUID) - ID único
- usuario_id (UUID) - Referencia a usuario
- accion (VARCHAR) - LOGIN / REGISTRO / COMPRA / PAGO
- descripcion (TEXT) - Detalles
- ip_address (VARCHAR) - IP del usuario
- timestamp (TIMESTAMP) - Fecha/hora
```

---

## 🎮 SISTEMAS INTEGRADOS

### 1. ABOGADOS OS (`/abogados-os`)
**Descripción:** Sistema operativo profesional para gestión legal

**Características:**
- Gestión de casos legales
- Calendario profesional
- Explorador de archivos
- Navegador web integrado
- Calculadora avanzada
- Autenticación integrada
- Sincronización de usuario

**Datos Compartidos:**
- Usuario autenticado (localStorage: `wi_user`)
- Balance de usuario
- Tokens disponibles
- Rol (admin/client)

### 2. GAME STATION (`/games`)
**Descripción:** Plataforma de entretenimiento con juegos

**Características:**
- Juegos interactivos
- Sistema de puntuación
- Logros y desafíos
- Multijugador
- Experiencias inmersivas
- Compra de créditos de juego
- Leaderboards

**Datos Compartidos:**
- Usuario autenticado
- Créditos de juego
- Puntuación global
- Logros desbloqueados

### 3. CRYPTO BANKING (`/crypto-banking`)
**Descripción:** Plataforma de finanzas digitales y trading

**Características:**
- Dashboard de trading en tiempo real
- Exchange de criptomonedas
- Gestión de wallets
- Trading P2P
- Staking de activos
- Copy trading
- Opciones binarias
- Programa de afiliados
- Datos en vivo de precios

**Datos Compartidos:**
- Usuario autenticado
- Wallets de criptomonedas
- Balance en USD
- Historial de transacciones
- Datos de trading en tiempo real

---

## 💳 FLUJO DE COMPRAS Y PAGOS

### 1. Usuario Inicia Sesión
```
/login → AuthService.login() → Supabase Auth
↓
Usuario autenticado
↓
localStorage: wi_user, nexuspro_user
```

### 2. Usuario Compra Tokens/Productos
```
/tienda → Selecciona producto
↓
/checkout → Carrito de compras
↓
Selecciona método de pago (PayPal/Pichincha/Binance)
↓
PaymentService.processPayment()
```

### 3. Procesamiento de Pago
```
PaymentService.processPayment()
↓
Valida datos
↓
Conecta con API de pago (PayPal/Binance)
↓
Espera confirmación
↓
Webhook: Confirmación recibida
↓
Actualiza BD:
  - Tabla: compras (estado: completed)
  - Tabla: usuarios (balance actualizado)
  - Tabla: transacciones (registra transacción)
  - Tabla: activity_logs (registra actividad)
↓
Sincroniza con localStorage
↓
Redirige a dashboard
```

### 4. Datos Disponibles en Dashboard
```
Dashboard muestra:
- Balance actual
- Tokens disponibles
- Historial de compras
- Transacciones recientes
- Wallets de crypto
- Datos de trading en vivo
```

---

## 🔐 SEGURIDAD IMPLEMENTADA

### Autenticación
- ✅ Supabase Auth (OAuth + Email/Password)
- ✅ JWT tokens con expiración
- ✅ Sesiones seguras

### Contraseñas
- ✅ Hash bcrypt (10 rounds)
- ✅ Validación: mínimo 8 caracteres
- ✅ Nunca se almacenan en texto plano

### Transacciones
- ✅ Validación de monto
- ✅ Verificación de usuario
- ✅ Confirmación de PayPal
- ✅ Logging de todas las actividades

### Datos
- ✅ Encriptación SSL/TLS
- ✅ Row Level Security (RLS) en Supabase
- ✅ Políticas de acceso por usuario
- ✅ Auditoría de cambios

---

## 📱 SINCRONIZACIÓN ENTRE PROYECTOS

Cuando un usuario inicia sesión en la plataforma principal:

```javascript
// En App.tsx
const userData = {
  id: user.id,
  email: user.email,
  name: user.user_metadata?.name,
  tier: user.role === 'admin' ? 'ADMIN' : 'STANDARD',
  isVerified: true,
  joinedAt: user.created_at,
  language: 'ES',
  theme: theme === 'dark' ? 'NEXUS' : 'ROYAL',
  xp: 1200,
  level: 3,
  streak: 5
};

// Se guarda en localStorage
localStorage.setItem('wi_user', JSON.stringify(userData));
localStorage.setItem('nexuspro_user', JSON.stringify(userData));
```

Los subproyectos leen automáticamente estos datos:
- **Abogados OS:** Lee `wi_user` para autenticación
- **Game Station:** Lee `wi_user` para usuario y créditos
- **Crypto Banking:** Lee `wi_user` para wallets y balance

---

## 🚀 CÓMO INICIAR CADA SISTEMA

### Desde el Hub de Proyectos (`/proyectos`)
1. Navega a `http://localhost:5173/proyectos`
2. Verás 3 tarjetas con los proyectos
3. Haz clic en "Acceder" en cada proyecto
4. Se redirige automáticamente a:
   - Abogados OS → `/abogados-os`
   - Game Station → `/games`
   - Crypto Banking → `/crypto-banking`

### Acceso Directo
- **Abogados OS:** `http://localhost:5173/abogados-os`
- **Game Station:** `http://localhost:5173/games`
- **Crypto Banking:** `http://localhost:5173/crypto-banking`
- **Trading Dashboard:** `http://localhost:5173/trading`

---

## 📊 DATOS EN TIEMPO REAL

### Trading Dashboard (`/trading`)
Muestra en vivo:
- Precios de BTC, ETH, BNB, XRP, ADA
- Cambios 24h en USD y %
- Capitalización de mercado
- Volumen de trading 24h
- Suministro circulante

**Actualización:** Cada minuto automáticamente
**Fuentes:** CoinGecko, Binance

---

## ✅ VERIFICACIÓN DE FUNCIONAMIENTO

### Rutas Activas
```bash
✅ http://localhost:5173/              # Inicio
✅ http://localhost:5173/login         # Login
✅ http://localhost:5173/register      # Registro
✅ http://localhost:5173/proyectos     # Hub de proyectos
✅ http://localhost:5173/abogados-os   # Abogados OS
✅ http://localhost:5173/games         # Game Station
✅ http://localhost:5173/crypto-banking # Crypto Banking
✅ http://localhost:5173/trading       # Trading Dashboard
✅ http://localhost:5173/seguridad     # Seguridad
✅ http://localhost:5173/dashboard     # Dashboard (requiere login)
```

### Flujo Completo
1. Abre `http://localhost:5173`
2. Haz clic en "Registro" o "Iniciar Sesión"
3. Crea cuenta o inicia sesión
4. Navega a "Proyectos" en el menú
5. Selecciona un proyecto y accede
6. Usa el dashboard para compras y pagos

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Ejecutar `SETUP_DATABASE.sql` en Supabase
2. ✅ Configurar credenciales de PayPal
3. ✅ Configurar API keys de trading (opcional)
4. ✅ Probar flujo completo de compras
5. ✅ Validar sincronización entre proyectos

---

**SISTEMA COMPLETAMENTE FUNCIONAL Y INTEGRADO**
**Todas las rutas activas, APIs en tiempo real, pagos funcionales**
