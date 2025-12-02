# 🎯 GUÍA COMPLETA - USUARIO FINAL

## Sistema Integrado Profesional con Supabase, Cloudflare y Base de Datos

---

## 📋 TABLA DE CONTENIDOS

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de Supabase](#configuración-de-supabase)
3. [Configuración de Cloudflare](#configuración-de-cloudflare)
4. [Estructura de Base de Datos](#estructura-de-base-de-datos)
5. [Autenticación de Usuario](#autenticación-de-usuario)
6. [Flujo de Usuario Final](#flujo-de-usuario-final)
7. [Funcionalidades Integradas](#funcionalidades-integradas)
8. [Solución de Problemas](#solución-de-problemas)

---

## ✅ Requisitos Previos

### Cuentas Necesarias
- ✅ Cuenta Supabase (https://supabase.com)
- ✅ Cuenta Cloudflare (https://cloudflare.com)
- ✅ Cuenta Binance (ID: 549755069)
- ✅ Cuenta PayPal
- ✅ Banco Pichincha (Cuenta: 2203728320)

### Instalación Local
```bash
# Clonar repositorio
git clone <repository-url>
cd casi-1

# Instalar dependencias
npm install

# Crear archivo .env.local
cp .env.example .env.local
```

---

## 🔧 Configuración de Supabase

### 1. Crear Proyecto en Supabase

1. Ve a https://supabase.com
2. Crea un nuevo proyecto
3. Copia las credenciales:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

### 2. Configurar Variables de Entorno

Crea archivo `.env.local`:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Cloudflare
VITE_CLOUDFLARE_ACCOUNT_ID=your-account-id
VITE_CLOUDFLARE_API_TOKEN=your-api-token

# APIs Externas
VITE_BINANCE_API_KEY=your-binance-key
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
VITE_GEMINI_API_KEY=your-gemini-key
```

### 3. Crear Tablas en Supabase

1. Ve a SQL Editor en Supabase
2. Copia y ejecuta el contenido de `SUPABASE_SETUP.sql`

**Tablas creadas:**
- `user_profiles` - Perfiles de usuario
- `player_profiles` - Perfiles de jugadores
- `tokens` - Tokens y créditos
- `purchases` - Compras y transacciones
- `game_improvements` - Mejoras de juego
- `crypto_wallets` - Wallets de criptomonedas
- `transactions` - Transacciones de trading
- `referrals` - Programa de afiliados
- `achievements` - Logros y badges
- `user_settings` - Configuración de usuario

### 4. Habilitar Autenticación

En Supabase:
1. Ve a Authentication → Providers
2. Habilita Email/Password
3. Configura URL de redirección: `http://localhost:3000/dashboard`

---

## ☁️ Configuración de Cloudflare

### 1. Configurar KV Storage

```bash
# Instalar Wrangler
npm install -g wrangler

# Crear namespace KV
wrangler kv:namespace create "PLATFORM_KV"

# Crear binding en wrangler.toml
[[kv_namespaces]]
binding = "PLATFORM_KV"
id = "your-kv-id"
```

### 2. Configurar D1 Database

```bash
# Crear base de datos D1
wrangler d1 create platform-db

# Migrar esquema
wrangler d1 execute platform-db --file=./SUPABASE_SETUP.sql
```

### 3. Configurar Workers

```toml
# wrangler.toml
name = "platform-worker"
main = "src/worker.ts"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "PLATFORM_KV"
id = "your-kv-id"

[[d1_databases]]
binding = "DB"
database_name = "platform-db"
database_id = "your-db-id"
```

---

## 🗄️ Estructura de Base de Datos

### Relaciones de Tablas

```
user_profiles (Tabla Principal)
├── player_profiles (1:1)
├── tokens (1:N)
├── purchases (1:N)
├── crypto_wallets (1:N)
├── transactions (1:N)
├── referrals (1:N como referrer)
└── user_settings (1:1)

player_profiles
├── game_improvements (1:N)
└── achievements (1:N)

referrals
├── referrer_id → user_profiles
└── referred_id → user_profiles
```

### Tipos de Datos Principales

```typescript
// Usuario
{
  id: UUID,
  email: string,
  name: string,
  avatar_url?: string,
  total_balance: number,
  total_tokens: number,
  referral_code: string,
  created_at: timestamp
}

// Jugador
{
  id: UUID,
  user_id: UUID,
  username: string,
  level: number,
  experience: number,
  total_score: number,
  games_played: number,
  games_won: number,
  achievements: string[]
}

// Token
{
  id: UUID,
  user_id: UUID,
  token_type: 'credit' | 'reward' | 'referral' | 'purchase',
  amount: number,
  created_at: timestamp
}

// Compra
{
  id: UUID,
  user_id: UUID,
  item_type: 'game' | 'upgrade' | 'subscription' | 'crypto',
  amount: number,
  currency: 'USD' | 'BTC' | 'ETH' | 'BNB',
  status: 'pending' | 'completed' | 'failed',
  payment_method: 'paypal' | 'binance' | 'pichincha' | 'card'
}

// Wallet Crypto
{
  id: UUID,
  user_id: UUID,
  currency: 'BTC' | 'ETH' | 'BNB' | 'USDT',
  balance: number,
  wallet_address: string
}

// Transacción
{
  id: UUID,
  user_id: UUID,
  type: 'buy' | 'sell' | 'transfer' | 'deposit' | 'withdrawal',
  amount: number,
  currency: string,
  status: 'pending' | 'completed' | 'failed'
}
```

---

## 🔐 Autenticación de Usuario

### Flujo de Registro

```
1. Usuario accede a /
   ↓
2. Haz clic en "Registrarse"
   ↓
3. Completa formulario:
   - Email
   - Contraseña
   - Nombre
   ↓
4. Sistema crea:
   - Cuenta en Supabase Auth
   - Perfil de usuario
   - Perfil de jugador
   - Configuración de usuario
   ↓
5. Redirige a /dashboard
```

### Flujo de Inicio de Sesión

```
1. Usuario accede a /
   ↓
2. Haz clic en "Iniciar Sesión"
   ↓
3. Ingresa email y contraseña
   ↓
4. Sistema verifica credenciales
   ↓
5. Carga datos de usuario:
   - Perfil
   - Tokens
   - Compras
   - Wallets
   ↓
6. Redirige a /dashboard
```

### Código de Autenticación

```typescript
// Usar en componentes
import { useAuth } from '@/context/AuthContext';

const MyComponent = () => {
  const { user, login, register, logout } = useAuth();

  // Registrar
  await register('email@example.com', 'password', 'Nombre');

  // Iniciar sesión
  await login({ email: 'email@example.com', password: 'password' });

  // Cerrar sesión
  await logout();

  return (
    <div>
      {user ? `Bienvenido, ${user.email}` : 'No autenticado'}
    </div>
  );
};
```

---

## 👤 Flujo de Usuario Final

### 1. Registro e Inicio de Sesión

```
Página Principal (/)
  ↓
[Botón Registrarse] → Formulario de Registro
  ├─ Email
  ├─ Contraseña
  ├─ Nombre
  └─ [Botón Registrarse]
    ↓
    Crea usuario en Supabase
    ↓
    Redirige a /dashboard
```

### 2. Dashboard Principal

```
Dashboard (/dashboard)
  ├─ Perfil de Usuario
  │  ├─ Avatar
  │  ├─ Nombre
  │  ├─ Email
  │  ├─ Balance Total
  │  └─ Tokens Disponibles
  │
  ├─ Estadísticas
  │  ├─ Nivel (si es jugador)
  │  ├─ Experiencia
  │  ├─ Puntuación Total
  │  └─ Logros
  │
  ├─ Acciones Rápidas
  │  ├─ [Ir a Juegos]
  │  ├─ [Ir a Trading]
  │  ├─ [Ir a Abogados OS]
  │  └─ [Configuración]
  │
  └─ Historial Reciente
     ├─ Últimas compras
     ├─ Últimas transacciones
     └─ Últimos logros
```

### 3. Secciones Integradas

#### Abogados OS (/abogados-os)
```
Sistema Operativo Legal
  ├─ Gestión de Casos
  │  ├─ Crear caso
  │  ├─ Ver casos
  │  ├─ Actualizar estado
  │  └─ Eliminar caso
  │
  ├─ Calendario
  │  ├─ Ver eventos
  │  ├─ Crear evento
  │  └─ Recordatorios
  │
  ├─ Explorador de Archivos
  │  ├─ Subir archivos
  │  ├─ Descargar archivos
  │  └─ Organizar carpetas
  │
  └─ Navegador Web Integrado
     └─ Acceso a recursos legales
```

#### Juegos (/games)
```
Plataforma de Entretenimiento
  ├─ Juegos Disponibles
  │  ├─ Seleccionar juego
  │  ├─ Jugar
  │  └─ Ver puntuación
  │
  ├─ Sistema de Puntuación
  │  ├─ Puntos ganados
  │  ├─ Ranking
  │  └─ Historial
  │
  ├─ Logros
  │  ├─ Ver logros desbloqueados
  │  ├─ Progreso de logros
  │  └─ Recompensas
  │
  └─ Mejoras
     ├─ Comprar mejoras
     ├─ Equipamiento
     └─ Power-ups
```

#### Trading & Crypto (/crypto-banking)
```
Plataforma de Finanzas Digitales
  ├─ Dashboard de Trading
  │  ├─ Portafolio
  │  ├─ Gráficos
  │  └─ Estadísticas
  │
  ├─ Exchange
  │  ├─ Comprar criptomonedas
  │  ├─ Vender criptomonedas
  │  └─ Historial de órdenes
  │
  ├─ Wallet
  │  ├─ Ver saldo
  │  ├─ Depositar
  │  ├─ Retirar
  │  └─ Transferir
  │
  ├─ P2P Trading
  │  ├─ Crear oferta
  │  ├─ Ver ofertas
  │  └─ Transacciones
  │
  ├─ Staking
  │  ├─ Seleccionar pool
  │  ├─ Depositar
  │  └─ Retirar ganancias
  │
  ├─ Copy Trading
  │  ├─ Seguir traders
  │  ├─ Copiar operaciones
  │  └─ Estadísticas
  │
  ├─ Binary Options
  │  ├─ Predicción de precios
  │  ├─ Colocar apuesta
  │  └─ Historial
  │
  └─ Referrals
     ├─ Código de referido
     ├─ Invitar amigos
     └─ Comisiones ganadas
```

### 4. Configuración de Usuario

```
Configuración (/dashboard/settings)
  ├─ Perfil
  │  ├─ Cambiar nombre
  │  ├─ Cambiar avatar
  │  ├─ Cambiar bio
  │  └─ [Guardar]
  │
  ├─ Seguridad
  │  ├─ Cambiar contraseña
  │  ├─ Habilitar 2FA
  │  ├─ Dispositivos conectados
  │  └─ [Guardar]
  │
  ├─ Preferencias
  │  ├─ Tema (NEXUS, LUXURY, CYBER, ROYAL, MIDNIGHT)
  │  ├─ Idioma (ES, EN)
  │  ├─ Notificaciones
  │  └─ Privacidad
  │
  └─ Datos
     ├─ Descargar datos
     ├─ Eliminar cuenta
     └─ [Confirmar]
```

---

## 🎯 Funcionalidades Integradas

### Sistema de Tokens
- ✅ Tokens de crédito
- ✅ Tokens de recompensa
- ✅ Tokens de referido
- ✅ Tokens de compra
- ✅ Balance automático

### Sistema de Compras
- ✅ Compra de juegos
- ✅ Compra de mejoras
- ✅ Suscripciones
- ✅ Criptomonedas
- ✅ Múltiples métodos de pago

### Sistema de Jugadores
- ✅ Perfiles de jugador
- ✅ Sistema de niveles
- ✅ Experiencia
- ✅ Puntuación
- ✅ Logros y badges

### Sistema de Trading
- ✅ Wallets de criptomonedas
- ✅ Compra/venta en tiempo real
- ✅ Historial de transacciones
- ✅ Análisis de precios
- ✅ Gráficos Canvas

### Sistema de Referidos
- ✅ Código de referido único
- ✅ Seguimiento de referidos
- ✅ Comisiones automáticas
- ✅ Historial de ganancias

---

## 🆘 Solución de Problemas

### Error: "No se puede conectar a Supabase"
**Solución:**
1. Verifica que `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` estén correctos
2. Verifica que el proyecto Supabase esté activo
3. Reinicia el servidor: `npm run dev`

### Error: "Tabla no encontrada"
**Solución:**
1. Ejecuta `SUPABASE_SETUP.sql` en SQL Editor de Supabase
2. Verifica que todas las tablas estén creadas
3. Comprueba que RLS esté habilitado

### Error: "Autenticación fallida"
**Solución:**
1. Verifica que el usuario esté registrado
2. Comprueba que la contraseña sea correcta
3. Verifica que el email esté confirmado

### Error: "Transacción fallida"
**Solución:**
1. Verifica el saldo disponible
2. Comprueba que el método de pago esté configurado
3. Revisa el estado de la transacción en la base de datos

---

## 📊 Monitoreo y Análisis

### Ver Estadísticas
```typescript
import { databaseService } from '@/services/DatabaseService';

// Obtener datos del usuario
const userData = await databaseService.syncUserData(userId);

// Ver tokens
const tokens = await databaseService.getUserTokens(userId);

// Ver compras
const purchases = await databaseService.getUserPurchases(userId);

// Ver transacciones
const transactions = await databaseService.getUserTransactions(userId);
```

### Exportar Datos
```typescript
// Descargar datos como JSON
const userData = await databaseService.syncUserData(userId);
const json = JSON.stringify(userData, null, 2);
const blob = new Blob([json], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'user-data.json';
a.click();
```

---

## 🚀 Deployment

### Desplegar en Cloudflare Pages
```bash
# Build
npm run build

# Deploy
wrangler pages deploy dist/
```

### Desplegar en Vercel
```bash
# Conectar repositorio
vercel link

# Deploy
vercel deploy --prod
```

---

## 📞 Soporte

### Documentación
- `INTEGRACION_SISTEMAS_COMPLETA.md` - Documentación técnica
- `GUIA_RAPIDA_INTEGRACION.md` - Guía rápida
- `PLATAFORMA_TRADING_INTEGRADA.md` - Detalles de trading

### Contacto
- Email: support@plataforma.com
- Chat: Asistente virtual en la plataforma
- Documentación: help.plataforma.com

---

## ✅ Checklist de Configuración

- [ ] Crear cuenta Supabase
- [ ] Copiar credenciales de Supabase
- [ ] Crear archivo `.env.local`
- [ ] Ejecutar `SUPABASE_SETUP.sql`
- [ ] Habilitar autenticación en Supabase
- [ ] Configurar Cloudflare KV
- [ ] Configurar Cloudflare D1
- [ ] Instalar dependencias (`npm install`)
- [ ] Iniciar servidor (`npm run dev`)
- [ ] Probar registro de usuario
- [ ] Probar inicio de sesión
- [ ] Probar compras
- [ ] Probar transacciones
- [ ] Probar referidos

---

**Plataforma Integrada - Usuario Final Ready**
**Versión: 1.0.0**
**Estado: ✅ PRODUCCIÓN**

