-- ===============================================
-- SCRIPT MÍNIMO PARA CREAR TABLAS ESENCIALES
-- Si el SQL completo falla, ejecuta esto
-- ===============================================

-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- TABLA: products (ESENCIAL)
CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  compare_at_price DECIMAL(10,2),
  category TEXT,
  type TEXT DEFAULT 'digital',
  tags TEXT[],
  images JSONB DEFAULT '[]',
  thumbnail TEXT,
  stock INTEGER DEFAULT 0,
  unlimited_stock BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLA: courses (ESENCIAL)
CREATE TABLE IF NOT EXISTS public.courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  category TEXT,
  level TEXT DEFAULT 'beginner',
  duration INTEGER DEFAULT 0,
  thumbnail TEXT,
  preview_video TEXT,
  instructor_name TEXT,
  what_you_learn JSONB DEFAULT '[]',
  requirements JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  enrollment_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABLA: course_modules (ESENCIAL)
CREATE TABLE IF NOT EXISTS public.course_modules (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, order_index)
);

-- TABLA: course_lessons (ESENCIAL)
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES public.course_modules(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  duration INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  type TEXT DEFAULT 'video',
  resources JSONB DEFAULT '[]',
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(module_id, order_index)
);

-- TABLA: blog_posts (ESENCIAL)
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID,
  author_name TEXT,
  category TEXT,
  tags TEXT[],
  thumbnail TEXT,
  status TEXT DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices básicos
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);

-- RLS básico
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas para desarrollo
DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_courses" ON courses;
CREATE POLICY "public_read_courses" ON courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_modules" ON course_modules;
CREATE POLICY "public_read_modules" ON course_modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_lessons" ON course_lessons;
CREATE POLICY "public_read_lessons" ON course_lessons FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_blog" ON blog_posts;
CREATE POLICY "public_read_blog" ON blog_posts FOR SELECT USING (status = 'published');

-- Insertar datos de prueba
INSERT INTO products (name, slug, description, short_description, price, category, type, status, featured) VALUES
('Guía Legal Test', 'guia-legal-test', 'Descripción de prueba', 'Prueba', 49.99, 'ebook', 'digital', 'active', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO courses (title, slug, description, short_description, price, category, level, status, featured) VALUES
('Curso de Prueba', 'curso-prueba', 'Descripción de prueba', 'Prueba', 99.99, 'Derecho', 'beginner', 'active', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, author_name, category, status) VALUES
('Artículo de Prueba', 'articulo-prueba', 'Extracto de prueba', 'Contenido de prueba', 'Admin', 'General', 'published')
ON CONFLICT (slug) DO NOTHING;

-- Mensaje de confirmación
DO $$
BEGIN
  RAISE NOTICE '✅ Tablas esenciales creadas!';
  RAISE NOTICE '✅ Datos de prueba insertados';
  RAISE NOTICE '✅ Ahora recarga la aplicación';
END $$;
