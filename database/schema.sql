-- =========================================
-- SCHEMA COMPLETO PARA PRODUCCIÓN
-- Sistema de E-commerce con Suscripciones
-- =========================================

-- LIMPIAR TABLAS EXISTENTES (CUIDADO EN PRODUCCIÓN)
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS user_products CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- =========================================
-- TABLA: profiles (Perfiles de Usuario)
-- =========================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  identification TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  country TEXT DEFAULT 'Ecuador',
  avatar_url TEXT,
  role TEXT DEFAULT 'client',
  tokens INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- =========================================
-- TABLA: products (Productos y Servicios)
-- =========================================
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  token_price INTEGER,
  category TEXT NOT NULL,
  type TEXT NOT NULL, -- 'service', 'course', 'ebook', 'consultation', 'subscription'
  image_url TEXT,
  images JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  duration TEXT,
  lessons INTEGER,
  pages INTEGER,
  file_url TEXT,
  video_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 999,
  is_digital BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  discount_percent INTEGER DEFAULT 0,
  tags TEXT[],
  metadata JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_slug ON products(slug);

-- =========================================
-- TABLA: orders (Órdenes de Compra)
-- =========================================
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2),
  tax DECIMAL(10,2),
  discount DECIMAL(10,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
  payment_method TEXT NOT NULL, -- 'card', 'paypal', 'bank_transfer', 'whatsapp'
  payment_details JSONB,
  transaction_id TEXT,
  items JSONB NOT NULL,
  billing_info JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Índices
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- =========================================
-- TABLA: purchases (Compras Individuales)
-- =========================================
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  product_type TEXT NOT NULL,
  product_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'expired', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_product_id ON purchases(product_id);
CREATE INDEX idx_purchases_order_id ON purchases(order_id);
CREATE INDEX idx_purchases_status ON purchases(status);

-- =========================================
-- TABLA: subscriptions (Suscripciones)
-- =========================================
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  purchase_id INTEGER REFERENCES purchases(id) ON DELETE SET NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  expiration_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'expired', 'cancelled'
  auto_renew BOOLEAN DEFAULT false,
  renewal_price DECIMAL(10,2),
  billing_cycle TEXT DEFAULT 'monthly', -- 'monthly', 'quarterly', 'yearly'
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_expiration ON subscriptions(expiration_date);

-- =========================================
-- TABLA: user_products (Acceso a Productos)
-- =========================================
CREATE TABLE user_products (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL,
  access_granted BOOLEAN DEFAULT true,
  purchase_id INTEGER REFERENCES purchases(id) ON DELETE SET NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  access_revoked_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  progress INTEGER DEFAULT 0, -- Para cursos y ebooks (0-100)
  completed BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  UNIQUE(user_id, product_id)
);

-- Índices
CREATE INDEX idx_user_products_user_id ON user_products(user_id);
CREATE INDEX idx_user_products_product_id ON user_products(product_id);
CREATE INDEX idx_user_products_access ON user_products(access_granted);

-- =========================================
-- TABLA: contact_messages (Formulario de Contacto)
-- =========================================
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'read', 'responded', 'archived'
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_created ON contact_messages(created_at DESC);

-- =========================================
-- FUNCIONES Y TRIGGERS
-- =========================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- =========================================

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Usuarios pueden ver su propio perfil" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Políticas para products (público puede leer)
CREATE POLICY "Cualquiera puede ver productos activos" ON products FOR SELECT USING (active = true);

-- Políticas para orders
CREATE POLICY "Usuarios pueden ver sus propias órdenes" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden crear sus propias órdenes" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para purchases
CREATE POLICY "Usuarios pueden ver sus propias compras" ON purchases FOR SELECT USING (auth.uid() = user_id);

-- Políticas para subscriptions
CREATE POLICY "Usuarios pueden ver sus propias suscripciones" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Políticas para user_products
CREATE POLICY "Usuarios pueden ver sus propios productos" ON user_products FOR SELECT USING (auth.uid() = user_id);

-- Políticas para contact_messages
CREATE POLICY "Cualquiera puede crear mensajes de contacto" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Usuarios autenticados pueden ver sus mensajes" ON contact_messages FOR SELECT USING (auth.uid() = user_id OR email = auth.email());

-- =========================================
-- DATOS DE EJEMPLO (PRODUCTOS)
-- =========================================

INSERT INTO products (name, slug, description, price, original_price, category, type, image_url, discount_percent, is_featured, is_popular, active) VALUES
('Consulta Legal Completa', 'consulta-legal-completa', 'Asesoría legal profesional de 1 hora con análisis completo de su caso', 150, 200, 'services', 'consultation', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400', 25, true, true, true),
('Redacción de Contratos', 'redaccion-contratos', 'Elaboración profesional de contratos personalizados', 299, NULL, 'services', 'service', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400', 0, false, true, true),
('Defensa Legal Penal', 'defensa-legal-penal', 'Representación legal completa en casos penales', 500, NULL, 'services', 'service', 'https://images.unsplash.com/photo-1505664194779-8beaceb93730?w=400', 0, true, false, true),
('Consulta Express 30 min', 'consulta-express-30', 'Consulta rápida para resolver dudas legales puntuales', 75, 100, 'consultations', 'consultation', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400', 25, false, true, true),
('Curso Derecho Penal Completo', 'curso-derecho-penal', 'Curso completo de derecho penal con certificación', 399, 599, 'courses', 'course', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400', 33, true, true, true),
('Guía Legal Ecuador 2024', 'guia-legal-ecuador-2024', 'Guía completa actualizada de leyes ecuatorianas', 49, 79, 'ebooks', 'ebook', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 38, true, true, true),
('Plan Mensual Premium', 'plan-mensual-premium', 'Acceso ilimitado a consultas por un mes', 99, NULL, 'subscriptions', 'subscription', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', 0, true, true, true),
('Plan Anual Profesional', 'plan-anual-profesional', 'Acceso ilimitado anual + beneficios exclusivos', 999, 1188, 'subscriptions', 'subscription', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', 16, true, true, true);

-- =========================================
-- VISTAS ÚTILES
-- =========================================

-- Vista de suscripciones activas próximas a vencer
CREATE OR REPLACE VIEW subscriptions_expiring_soon AS
SELECT 
  s.*,
  p.full_name,
  p.email,
  prod.name as product_name,
  DATE_PART('day', s.expiration_date - NOW()) as days_remaining
FROM subscriptions s
JOIN profiles p ON s.user_id = p.id
LEFT JOIN products prod ON s.product_id = prod.id
WHERE s.status = 'active'
  AND s.expiration_date <= NOW() + INTERVAL '7 days'
ORDER BY s.expiration_date ASC;

-- Vista de estadísticas de ventas
CREATE OR REPLACE VIEW sales_statistics AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_orders,
  SUM(amount) as total_revenue,
  AVG(amount) as average_order_value,
  payment_method
FROM orders
WHERE status = 'completed'
GROUP BY DATE_TRUNC('day', created_at), payment_method
ORDER BY date DESC;

-- =========================================
-- FIN DEL SCHEMA
-- =========================================

-- Mensaje de confirmación
DO $$
BEGIN
  RAISE NOTICE 'Schema de base de datos creado exitosamente!';
  RAISE NOTICE 'Tablas: profiles, products, orders, purchases, subscriptions, user_products, contact_messages';
  RAISE NOTICE 'Vistas: subscriptions_expiring_soon, sales_statistics';
END $$;
