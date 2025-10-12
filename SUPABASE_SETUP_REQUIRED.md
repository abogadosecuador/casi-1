# ⚠️ CONFIGURACIÓN REQUERIDA EN SUPABASE

## 🗄️ Tablas Faltantes en Supabase

Tu base de datos necesita estas tablas para funcionar completamente:

### **1. Tabla: `profiles`**
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);
```

### **2. Tabla: `comments`**
```sql
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- RLS Policies
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone" 
  ON comments FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert comments" 
  ON comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
```

### **3. Tabla: `affiliates`**
```sql
CREATE TABLE affiliates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  affiliate_code TEXT UNIQUE NOT NULL,
  commission_rate DECIMAL DEFAULT 0.10,
  total_earnings DECIMAL DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_affiliates_user_id ON affiliates(user_id);
CREATE INDEX idx_affiliates_code ON affiliates(affiliate_code);

-- RLS Policies
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own affiliate data" 
  ON affiliates FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own affiliate data" 
  ON affiliates FOR UPDATE 
  USING (auth.uid() = user_id);
```

### **4. Tabla: `consultations`**
```sql
CREATE TABLE consultations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  details JSONB,
  price DECIMAL,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_consultations_user_id ON consultations(user_id);
CREATE INDEX idx_consultations_status ON consultations(status);

-- RLS Policies
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own consultations" 
  ON consultations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create consultations" 
  ON consultations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
```

### **5. Tabla: `purchases`**
```sql
CREATE TABLE purchases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  product_type TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT,
  amount DECIMAL NOT NULL,
  payment_method TEXT DEFAULT 'paypal',
  payment_status TEXT DEFAULT 'completed',
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_created_at ON purchases(created_at DESC);

-- RLS Policies
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases" 
  ON purchases FOR SELECT 
  USING (auth.uid() = user_id);
```

---

## 🚀 Cómo Crear las Tablas

### **Opción 1: SQL Editor en Supabase**
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor** en el menú lateral
4. Copia y pega cada bloque SQL de arriba
5. Ejecuta cada uno con el botón "Run"

### **Opción 2: Desde la Terminal**
```bash
# Asegúrate de tener supabase CLI instalado
npm install -g supabase

# Login
supabase login

# Link al proyecto
supabase link --project-ref kbybhgxqdefuquybstqk

# Aplica las migraciones
supabase db push
```

---

## ✅ Verificación

Después de crear las tablas, verifica en Supabase Dashboard:
- Ve a **Table Editor**
- Debes ver: `profiles`, `comments`, `affiliates`, `consultations`, `purchases`
- Todas con RLS (Row Level Security) habilitado

---

## 📊 Estado Actual

❌ **Tablas faltantes detectadas:**
- `profiles` (Error 406 - No Accept header)
- `comments` (Error 404)
- `affiliates` (Error 404)

✅ **Ya configurado:**
- Supabase URL: `https://kbybhgxqdefuquybstqk.supabase.co`
- Autenticación funcionando
- Conexión establecida

---

## ⏱️ Tiempo Estimado: 10 minutos

Una vez creadas las tablas, la aplicación funcionará al 100% sin errores.
