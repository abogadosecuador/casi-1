# 🎯 SISTEMA DE TOKENS COMPLETO E INTEGRADO

## Tokens Funcionales, Base de Datos, Formularios Compartidos y Contexto Global

---

## 📋 TABLA DE CONTENIDOS

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Sistema de Tokens](#sistema-de-tokens)
4. [Base de Datos Integrada](#base-de-datos-integrada)
5. [Formularios Compartidos](#formularios-compartidos)
6. [Contexto Global](#contexto-global)
7. [Flujos de Datos](#flujos-de-datos)
8. [Explicaciones Detalladas](#explicaciones-detalladas)

---

## 🎯 Descripción General

### ¿Qué es el Sistema de Tokens Completo?

Un **sistema integrado y centralizado** que gestiona:

1. **Tokens**: Moneda virtual de la plataforma
2. **Base de Datos**: Almacenamiento de todos los datos
3. **Formularios**: Componentes reutilizables en todos los sistemas
4. **Contexto**: Estado global compartido
5. **Información**: Datos distribuidos y organizados

### Características Principales

✅ **Un solo sistema** para todo
✅ **Sin duplicaciones** de código
✅ **Base de datos centralizada** (Supabase)
✅ **Formularios compartidos** en todos los sistemas
✅ **Contexto global** para estado compartido
✅ **Información bien organizada** y clasificada
✅ **Explicaciones claras** para no confundir
✅ **Profesional** y funcional

---

## 🏗️ Arquitectura del Sistema

### Estructura Completa

```
src/
├── context/
│   ├── TokenContext.tsx          # Contexto de tokens
│   ├── AuthContext.tsx           # Contexto de autenticación
│   ├── DataContext.tsx           # Contexto de datos globales
│   └── FormContext.tsx           # Contexto de formularios
│
├── services/
│   ├── TokenService.ts           # Servicio de tokens
│   ├── DatabaseService.ts        # Servicio de base de datos
│   ├── PaymentService.ts         # Servicio de pagos
│   └── FormService.ts            # Servicio de formularios
│
├── components/
│   ├── Forms/
│   │   ├── SharedForm.tsx        # Formulario compartido
│   │   ├── TokenForm.tsx         # Formulario de tokens
│   │   ├── PaymentForm.tsx       # Formulario de pagos
│   │   └── ProfileForm.tsx       # Formulario de perfil
│   │
│   ├── Tokens/
│   │   ├── TokenDisplay.tsx      # Mostrar tokens
│   │   ├── TokenPurchase.tsx     # Comprar tokens
│   │   └── TokenHistory.tsx      # Historial de tokens
│   │
│   └── ...otros componentes
│
├── types/
│   ├── token.ts                  # Tipos de tokens
│   ├── form.ts                   # Tipos de formularios
│   ├── payment.ts                # Tipos de pagos
│   └── data.ts                   # Tipos de datos
│
└── hooks/
    ├── useTokens.ts              # Hook de tokens
    ├── useForm.ts                # Hook de formularios
    ├── useData.ts                # Hook de datos
    └── usePayment.ts             # Hook de pagos
```

---

## 💰 Sistema de Tokens

### ¿Qué son los Tokens?

**Tokens** = Moneda virtual de la plataforma

- Se ganan jugando
- Se compran con dinero real
- Se usan para comprar productos
- Se transfieren entre usuarios
- Se registran en base de datos

### Tipos de Tokens

```typescript
// 1. TOKENS DE CRÉDITO
// - Se compran con dinero real
// - Moneda principal de la plataforma
// - Convertibles a dinero

// 2. TOKENS DE RECOMPENSA
// - Se ganan jugando
// - Se ganan completando tareas
// - No convertibles directamente

// 3. TOKENS DE REFERIDO
// - Se ganan refiriendo amigos
// - Comisión por referido
// - Convertibles

// 4. TOKENS DE PROMOCIÓN
// - Regalados por la plataforma
// - Limitados en tiempo
// - No transferibles
```

### Flujo de Tokens

```
USUARIO FINAL
    ↓
    ├─ COMPRA TOKENS
    │  ├─ Selecciona cantidad
    │  ├─ Selecciona método de pago
    │  ├─ Realiza pago
    │  └─ Recibe tokens
    │
    ├─ USA TOKENS
    │  ├─ Compra productos
    │  ├─ Compra mejoras
    │  └─ Paga servicios
    │
    ├─ GANA TOKENS
    │  ├─ Jugando
    │  ├─ Completando tareas
    │  └─ Refiriendo amigos
    │
    └─ VE HISTORIAL
       ├─ Compras
       ├─ Gastos
       └─ Ganancias
```

### Contexto de Tokens

```typescript
// TokenContext.tsx

interface TokenContextType {
  // Estado
  tokens: number;                    // Tokens actuales
  tokenHistory: TokenTransaction[];  // Historial
  
  // Métodos
  addTokens: (amount: number, reason: string) => void;
  useTokens: (amount: number, reason: string) => boolean;
  getTokenBalance: () => number;
  getTokenHistory: () => TokenTransaction[];
  
  // Sincronización
  syncTokensWithDatabase: () => Promise<void>;
}

// Uso en componentes
const { tokens, addTokens, useTokens } = useTokens();
```

### Servicio de Tokens

```typescript
// TokenService.ts

class TokenService {
  // Obtener tokens del usuario
  async getUserTokens(userId: string): Promise<number>
  
  // Agregar tokens
  async addTokens(userId: string, amount: number, reason: string): Promise<void>
  
  // Usar tokens
  async useTokens(userId: string, amount: number, reason: string): Promise<boolean>
  
  // Obtener historial
  async getTokenHistory(userId: string): Promise<TokenTransaction[]>
  
  // Sincronizar con base de datos
  async syncTokens(userId: string): Promise<void>
  
  // Convertir a dinero
  async convertTokensToCash(userId: string, amount: number): Promise<void>
}
```

---

## 🗄️ Base de Datos Integrada

### Tablas Principales

#### 1. user_profiles
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  total_tokens INTEGER DEFAULT 0,
  total_balance DECIMAL(18, 8) DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Explicación:**
- `id`: Identificador único del usuario
- `email`: Email del usuario (único)
- `name`: Nombre del usuario
- `total_tokens`: Tokens actuales
- `total_balance`: Balance en dinero
- `created_at`: Fecha de creación
- `updated_at`: Última actualización

#### 2. tokens (Historial de Tokens)
```sql
CREATE TABLE tokens (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  token_type VARCHAR(50),  -- 'credit', 'reward', 'referral', 'promotion'
  amount INTEGER,
  reason VARCHAR(255),
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
```

**Explicación:**
- `id`: ID único de la transacción
- `user_id`: Usuario que recibió los tokens
- `token_type`: Tipo de token
- `amount`: Cantidad de tokens
- `reason`: Razón de la transacción
- `created_at`: Fecha de creación
- `expires_at`: Fecha de expiración (si aplica)

#### 3. purchases (Compras)
```sql
CREATE TABLE purchases (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  item_type VARCHAR(50),  -- 'game', 'upgrade', 'subscription', 'crypto'
  item_name VARCHAR(255),
  amount DECIMAL(18, 8),
  currency VARCHAR(10),
  tokens_spent INTEGER,
  status VARCHAR(50),  -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Explicación:**
- `id`: ID único de la compra
- `user_id`: Usuario que compró
- `item_type`: Tipo de producto
- `item_name`: Nombre del producto
- `amount`: Monto pagado
- `currency`: Moneda
- `tokens_spent`: Tokens gastados
- `status`: Estado de la compra
- `created_at`: Fecha de compra
- `updated_at`: Última actualización

#### 4. transactions (Transacciones)
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id),
  type VARCHAR(50),  -- 'buy', 'sell', 'transfer', 'deposit', 'withdrawal'
  amount DECIMAL(18, 8),
  currency VARCHAR(10),
  status VARCHAR(50),  -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP
);
```

**Explicación:**
- `id`: ID único de la transacción
- `user_id`: Usuario involucrado
- `type`: Tipo de transacción
- `amount`: Monto
- `currency`: Moneda
- `status`: Estado
- `created_at`: Fecha

### Relaciones entre Tablas

```
user_profiles (1)
    ↓
    ├─ tokens (N)           [Un usuario tiene muchos tokens]
    ├─ purchases (N)        [Un usuario hace muchas compras]
    ├─ transactions (N)     [Un usuario hace muchas transacciones]
    └─ player_profiles (1)  [Un usuario es un jugador]
```

---

## 📝 Formularios Compartidos

### Formulario Base Compartido

```typescript
// SharedForm.tsx

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea';
  required: boolean;
  validation?: (value: any) => string | null;
  options?: { value: string; label: string }[];
}

interface SharedFormProps {
  fields: FormField[];
  onSubmit: (data: any) => Promise<void>;
  submitText?: string;
  isLoading?: boolean;
  error?: string;
  success?: string;
}

const SharedForm: React.FC<SharedFormProps> = ({
  fields,
  onSubmit,
  submitText = 'Enviar',
  isLoading = false,
  error,
  success
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar
    const newErrors = {};
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = 'Campo requerido';
      }
      if (field.validation) {
        const error = field.validation(formData[field.name]);
        if (error) newErrors[field.name] = error;
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Enviar
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            />
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Selecciona una opción</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg"
            />
          )}
          
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
      
      {error && <div className="bg-red-100 p-3 rounded text-red-700">{error}</div>}
      {success && <div className="bg-green-100 p-3 rounded text-green-700">{success}</div>}
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Enviando...' : submitText}
      </button>
    </form>
  );
};
```

### Formularios Específicos

#### Formulario de Tokens
```typescript
const tokenFields: FormField[] = [
  {
    name: 'amount',
    label: 'Cantidad de Tokens',
    type: 'number',
    required: true,
    validation: (value) => {
      if (value <= 0) return 'Debe ser mayor a 0';
      if (value > 1000000) return 'Excede el límite';
      return null;
    }
  },
  {
    name: 'reason',
    label: 'Razón',
    type: 'select',
    required: true,
    options: [
      { value: 'purchase', label: 'Compra' },
      { value: 'reward', label: 'Recompensa' },
      { value: 'referral', label: 'Referido' }
    ]
  }
];
```

#### Formulario de Compra
```typescript
const purchaseFields: FormField[] = [
  {
    name: 'itemName',
    label: 'Nombre del Producto',
    type: 'text',
    required: true
  },
  {
    name: 'amount',
    label: 'Monto',
    type: 'number',
    required: true
  },
  {
    name: 'currency',
    label: 'Moneda',
    type: 'select',
    required: true,
    options: [
      { value: 'USD', label: 'USD' },
      { value: 'BTC', label: 'Bitcoin' },
      { value: 'ETH', label: 'Ethereum' }
    ]
  }
];
```

---

## 🌍 Contexto Global

### DataContext

```typescript
// DataContext.tsx

interface GlobalData {
  // Usuario
  user: User | null;
  
  // Tokens
  tokens: number;
  tokenHistory: TokenTransaction[];
  
  // Datos de compra
  purchases: Purchase[];
  
  // Datos de transacciones
  transactions: Transaction[];
  
  // Datos de perfil
  profile: UserProfile | null;
}

interface DataContextType {
  // Estado
  data: GlobalData;
  
  // Métodos
  loadUserData: (userId: string) => Promise<void>;
  updateTokens: (amount: number) => Promise<void>;
  addPurchase: (purchase: Purchase) => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  syncAllData: () => Promise<void>;
}
```

### Uso en Componentes

```typescript
// En cualquier componente
const { data, updateTokens, addPurchase } = useData();

// Acceder a datos
console.log(data.tokens);        // Tokens actuales
console.log(data.purchases);     // Historial de compras
console.log(data.transactions);  // Historial de transacciones

// Actualizar datos
await updateTokens(100);         // Agregar 100 tokens
await addPurchase(purchase);     // Agregar compra
```

---

## 🔄 Flujos de Datos

### Flujo de Compra de Tokens

```
1. USUARIO ABRE FORMULARIO
   ↓
2. COMPLETA FORMULARIO
   ├─ Cantidad
   ├─ Método de pago
   └─ Información personal
   ↓
3. ENVÍA FORMULARIO
   ↓
4. VALIDACIÓN EN CLIENTE
   ├─ Validar cantidad
   ├─ Validar método
   └─ Validar información
   ↓
5. ENVÍA A SERVIDOR
   ↓
6. VALIDACIÓN EN SERVIDOR
   ├─ Validar usuario
   ├─ Validar información
   └─ Validar método de pago
   ↓
7. PROCESA PAGO
   ├─ Crea transacción
   ├─ Procesa con método
   └─ Verifica pago
   ↓
8. ACTUALIZA BASE DE DATOS
   ├─ Suma tokens
   ├─ Registra transacción
   └─ Actualiza balance
   ↓
9. ACTUALIZA CONTEXTO
   ├─ Actualiza tokens en memoria
   ├─ Actualiza historial
   └─ Sincroniza con cliente
   ↓
10. MUESTRA CONFIRMACIÓN
    ├─ Mensaje de éxito
    ├─ Nuevos tokens
    └─ Historial actualizado
```

### Flujo de Uso de Tokens

```
1. USUARIO SELECCIONA PRODUCTO
   ↓
2. ABRE MODAL DE COMPRA
   ├─ Muestra precio en tokens
   ├─ Muestra tokens disponibles
   └─ Botón "Comprar"
   ↓
3. USUARIO CONFIRMA
   ↓
4. VALIDA TOKENS DISPONIBLES
   ├─ Si tiene suficientes: continúa
   └─ Si no: muestra error
   ↓
5. RESTA TOKENS
   ├─ Actualiza en contexto
   ├─ Actualiza en base de datos
   └─ Registra transacción
   ↓
6. COMPLETA COMPRA
   ├─ Entrega producto
   ├─ Registra compra
   └─ Actualiza historial
   ↓
7. MUESTRA CONFIRMACIÓN
   ├─ Tokens restantes
   ├─ Producto recibido
   └─ Historial actualizado
```

---

## 📖 Explicaciones Detalladas

### ¿Por qué Contexto Global?

**Ventajas:**
1. **Acceso desde cualquier componente** sin pasar props
2. **Sincronización automática** de datos
3. **Actualización en tiempo real** de tokens
4. **Menos re-renders** innecesarios
5. **Código más limpio** y mantenible

**Comparación:**

❌ **Mal (Pasar props):**
```typescript
<App>
  <Dashboard tokens={tokens}>
    <GameSection tokens={tokens}>
      <Game tokens={tokens} />
    </GameSection>
  </Dashboard>
</App>
```

✅ **Bien (Contexto):**
```typescript
<DataProvider>
  <App>
    <Dashboard>
      <GameSection>
        <Game />  {/* Accede a tokens desde contexto */}
      </GameSection>
    </Dashboard>
  </App>
</DataProvider>
```

### ¿Por qué Formularios Compartidos?

**Ventajas:**
1. **Un solo componente** para todos los formularios
2. **Validación centralizada**
3. **Estilos consistentes**
4. **Manejo de errores unificado**
5. **Reutilizable** en todos los sistemas

**Ejemplo:**

```typescript
// Mismo componente, diferentes campos
<SharedForm
  fields={tokenFields}
  onSubmit={handleTokenSubmit}
/>

<SharedForm
  fields={purchaseFields}
  onSubmit={handlePurchaseSubmit}
/>

<SharedForm
  fields={profileFields}
  onSubmit={handleProfileSubmit}
/>
```

### ¿Por qué Base de Datos Centralizada?

**Ventajas:**
1. **Una fuente de verdad** para todos los datos
2. **Sincronización automática** entre sistemas
3. **Historial completo** de transacciones
4. **Reportes y análisis** fáciles
5. **Backup y recuperación** centralizada

---

## ✅ Checklist de Implementación

- [ ] Crear/mejorar TokenContext
- [ ] Crear DataContext
- [ ] Crear FormContext
- [ ] Crear TokenService
- [ ] Crear FormService
- [ ] Crear SharedForm
- [ ] Crear formularios específicos
- [ ] Integrar en Abogados OS
- [ ] Integrar en Juegos
- [ ] Integrar en Trading
- [ ] Sincronizar con base de datos
- [ ] Probar flujos completos
- [ ] Documentar para usuario final

---

## 📚 Resumen de Archivos Necesarios

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `TokenContext.tsx` | Contexto de tokens | ✅ Existe |
| `DataContext.tsx` | Contexto de datos globales | ⏳ Crear |
| `FormContext.tsx` | Contexto de formularios | ⏳ Crear |
| `TokenService.ts` | Servicio de tokens | ⏳ Crear |
| `FormService.ts` | Servicio de formularios | ⏳ Crear |
| `SharedForm.tsx` | Formulario compartido | ⏳ Crear |
| `TokenDisplay.tsx` | Mostrar tokens | ⏳ Crear |
| `TokenPurchase.tsx` | Comprar tokens | ⏳ Crear |

---

**Sistema de Tokens Completo - Documentación Profesional**
**Versión: 1.0.0**
**Estado: ✅ LISTO PARA IMPLEMENTAR**

