-- ===============================================
-- SISTEMA COMPLETO - TODO PARA USUARIO FINAL
-- Cursos con módulos y lecciones + Contenido completo
-- ===============================================

-- ==========================================
-- PARTE 1: CURSOS COMPLETOS CON MÓDULOS Y LECCIONES
-- ==========================================

-- Curso 1: Derecho Penal Ecuatoriano Completo
INSERT INTO courses (title, slug, description, short_description, price, category, level, duration, thumbnail, instructor_name, status, featured) VALUES
('Derecho Penal Ecuatoriano Completo', 'derecho-penal-completo',
'Curso exhaustivo sobre el Código Orgánico Integral Penal (COIP). Aprende teoría del delito, procedimientos penales, defensas legales y jurisprudencia actualizada.',
'Domina el derecho penal desde cero',
299.99, 'Derecho Penal', 'intermediate', 480,
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'Dr. Wilson Ipiales', 'active', true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  status = EXCLUDED.status;

-- Módulos del Curso de Derecho Penal
INSERT INTO course_modules (course_id, title, description, order_index) VALUES
((SELECT id FROM courses WHERE slug = 'derecho-penal-completo'), 'Introducción al Derecho Penal', 'Conceptos fundamentales y principios rectores', 1),
((SELECT id FROM courses WHERE slug = 'derecho-penal-completo'), 'Teoría del Delito', 'Elementos del delito y análisis jurídico', 2),
((SELECT id FROM courses WHERE slug = 'derecho-penal-completo'), 'Sistema de Penas', 'Tipos de penas y sistema de ejecución', 3),
((SELECT id FROM courses WHERE slug = 'derecho-penal-completo'), 'Procedimiento Penal', 'Etapas del proceso penal completo', 4)
ON CONFLICT DO NOTHING;

-- Lecciones del Módulo 1
INSERT INTO course_lessons (module_id, course_id, title, description, video_url, duration, order_index, type, is_preview) VALUES
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-penal-completo') AND order_index = 1),
 (SELECT id FROM courses WHERE slug = 'derecho-penal-completo'),
 'Concepto de Derecho Penal', 'Definición, naturaleza jurídica y características del derecho penal moderno',
 'https://www.youtube.com/watch?v=example1', 18, 1, 'video', true),
 
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-penal-completo') AND order_index = 1),
 (SELECT id FROM courses WHERE slug = 'derecho-penal-completo'),
 'Principios Constitucionales', 'Legalidad, tipicidad, proporcionalidad y favorabilidad',
 'https://www.youtube.com/watch?v=example2', 22, 2, 'video', true),
 
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-penal-completo') AND order_index = 1),
 (SELECT id FROM courses WHERE slug = 'derecho-penal-completo'),
 'El COIP - Estructura', 'Análisis del Código Orgánico Integral Penal vigente',
 'https://www.youtube.com/watch?v=example3', 25, 3, 'video', false)
ON CONFLICT DO NOTHING;

-- Lecciones del Módulo 2
INSERT INTO course_lessons (module_id, course_id, title, description, video_url, duration, order_index, type, is_preview) VALUES
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-penal-completo') AND order_index = 2),
 (SELECT id FROM courses WHERE slug = 'derecho-penal-completo'),
 'Elementos del Delito', 'Tipicidad, antijuridicidad y culpabilidad',
 'https://www.youtube.com/watch?v=example4', 30, 1, 'video', false),
 
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-penal-completo') AND order_index = 2),
 (SELECT id FROM courses WHERE slug = 'derecho-penal-completo'),
 'Análisis de la Tipicidad', 'Tipicidad objetiva y subjetiva',
 'https://www.youtube.com/watch?v=example5', 28, 2, 'video', false)
ON CONFLICT DO NOTHING;

-- Curso 2: Derecho Civil Práctico
INSERT INTO courses (title, slug, description, short_description, price, category, level, duration, thumbnail, instructor_name, status, featured) VALUES
('Derecho Civil Práctico', 'derecho-civil-practico',
'Todo sobre contratos, obligaciones, responsabilidad civil y derechos reales con casos prácticos.',
'Fundamentos del derecho civil ecuatoriano',
249.99, 'Derecho Civil', 'beginner', 360,
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'Dra. María González', 'active', true)
ON CONFLICT (slug) DO UPDATE SET status = EXCLUDED.status;

-- Módulos del Curso de Derecho Civil
INSERT INTO course_modules (course_id, title, description, order_index) VALUES
((SELECT id FROM courses WHERE slug = 'derecho-civil-practico'), 'Introducción al Derecho Civil', 'Conceptos fundamentales y fuentes', 1),
((SELECT id FROM courses WHERE slug = 'derecho-civil-practico'), 'Contratos Civiles', 'Teoría general de contratos', 2),
((SELECT id FROM courses WHERE slug = 'derecho-civil-practico'), 'Obligaciones', 'Fuentes y clasificación de obligaciones', 3)
ON CONFLICT DO NOTHING;

-- Lecciones Derecho Civil
INSERT INTO course_lessons (module_id, course_id, title, description, video_url, duration, order_index, type, is_preview) VALUES
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-civil-practico') AND order_index = 1),
 (SELECT id FROM courses WHERE slug = 'derecho-civil-practico'),
 '¿Qué es el Derecho Civil?', 'Definición, objeto y características',
 'https://www.youtube.com/watch?v=civil1', 15, 1, 'video', true),
 
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-civil-practico') AND order_index = 1),
 (SELECT id FROM courses WHERE slug = 'derecho-civil-practico'),
 'Fuentes del Derecho Civil', 'Ley, costumbre, jurisprudencia',
 'https://www.youtube.com/watch?v=civil2', 20, 2, 'video', true)
ON CONFLICT DO NOTHING;

-- Curso 3: Derecho Laboral
INSERT INTO courses (title, slug, description, short_description, price, category, level, duration, thumbnail, instructor_name, status, featured) VALUES
('Derecho Laboral Completo', 'derecho-laboral-completo',
'Relaciones laborales, contratos, despidos, indemnizaciones y procedimientos laborales.',
'Protege tus derechos laborales',
199.99, 'Derecho Laboral', 'beginner', 300,
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'Abg. Carlos Ruiz', 'active', false)
ON CONFLICT (slug) DO UPDATE SET status = EXCLUDED.status;

-- Módulos Derecho Laboral
INSERT INTO course_modules (course_id, title, description, order_index) VALUES
((SELECT id FROM courses WHERE slug = 'derecho-laboral-completo'), 'Introducción al Derecho Laboral', 'Principios y fuentes', 1),
((SELECT id FROM courses WHERE slug = 'derecho-laboral-completo'), 'Contrato de Trabajo', 'Tipos y características', 2),
((SELECT id FROM courses WHERE slug = 'derecho-laboral-completo'), 'Derechos del Trabajador', 'Remuneración, jornada, vacaciones', 3)
ON CONFLICT DO NOTHING;

-- Lecciones Derecho Laboral
INSERT INTO course_lessons (module_id, course_id, title, description, video_url, duration, order_index, type, is_preview) VALUES
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-laboral-completo') AND order_index = 1),
 (SELECT id FROM courses WHERE slug = 'derecho-laboral-completo'),
 'Principios del Derecho Laboral', 'In dubio pro operario y otros principios',
 'https://www.youtube.com/watch?v=laboral1', 18, 1, 'video', true),
 
((SELECT id FROM course_modules WHERE course_id = (SELECT id FROM courses WHERE slug = 'derecho-laboral-completo') AND order_index = 2),
 (SELECT id FROM courses WHERE slug = 'derecho-laboral-completo'),
 'Tipos de Contratos', 'Indefinido, plazo fijo, ocasional',
 'https://www.youtube.com/watch?v=laboral2', 25, 1, 'video', false)
ON CONFLICT DO NOTHING;

-- ==========================================
-- PARTE 2: PRODUCTOS COMPLETOS (22)
-- ==========================================

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category, type, thumbnail, status, featured) VALUES

-- SERVICIOS (6)
('Servicio de Derecho Penal', 'servicio-derecho-penal',
'Representación legal completa en casos penales con estrategia personalizada',
'Defensa penal profesional', 500, 650, 'service', 'service',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', 'active', true),

('Servicio de Derecho Civil', 'servicio-derecho-civil',
'Asesoría y representación en casos civiles, contratos, herencias y divorcios',
'Asesoría civil integral', 400, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800', 'active', false),

('Servicio de Derecho Comercial', 'servicio-derecho-comercial',
'Constitución de empresas, contratos mercantiles y propiedad intelectual',
'Servicios para empresas', 450, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 'active', false),

('Servicio de Derecho Laboral', 'servicio-derecho-laboral',
'Defensa laboral, despidos, indemnizaciones y negociación colectiva',
'Defiende tus derechos laborales', 350, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800', 'active', false),

('Servicio de Derecho de Tránsito', 'servicio-derecho-transito',
'Impugnación de multas, accidentes y recuperación de puntos',
'Especialistas en tránsito', 250, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800', 'active', false),

('Servicio de Derecho Aduanero', 'servicio-derecho-aduanero',
'Importaciones, exportaciones y recursos contra sanciones aduaneras',
'Comercio exterior', 550, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800', 'active', false),

-- CONSULTAS (5)
('Consulta General', 'consulta-general',
'Consulta legal de 1 hora para resolver dudas jurídicas',
'Asesoría legal general', 80, 100, 'consultation', 'service',
'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800', 'active', false),

('Consulta Penal', 'consulta-penal',
'Consulta especializada en derecho penal y análisis de casos',
'Asesoría penal especializada', 120, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', 'active', false),

('Consulta Civil', 'consulta-civil',
'Consulta en temas civiles: contratos, herencias, divorcios',
'Asesoría civil', 100, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800', 'active', false),

('Consulta Empresarial', 'consulta-empresarial',
'Consulta legal para empresarios sobre derecho comercial',
'Para empresas', 150, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 'active', false),

('Consulta Online', 'consulta-online',
'Consulta virtual por videollamada desde cualquier lugar',
'Consulta digital', 90, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800', 'active', false),

-- EBOOKS (5)
('Guía Legal para Emprendedores', 'guia-emprendedores',
'150 páginas sobre aspectos legales para iniciar tu negocio',
'Tu guía para emprender', 25, 39, 'ebook', 'digital',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', 'active', true),

('Introducción al Derecho Penal', 'intro-derecho-penal',
'80 páginas sobre conceptos básicos del derecho penal',
'Fundamentos penales', 15, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', 'active', false),

('Manual de Contratos', 'manual-contratos',
'200 páginas con 50+ plantillas de contratos',
'50+ plantillas listas', 29.99, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800', 'active', false),

('Derecho de Familia', 'derecho-familia',
'120 páginas sobre divorcios, pensiones y custodia',
'Guía de derecho familiar', 22.50, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800', 'active', false),

('Derechos Fundamentales', 'derechos-fundamentales',
'100 páginas sobre derechos fundamentales en Ecuador',
'Conoce tus derechos', 19.99, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800', 'active', false),

-- CURSOS COMO PRODUCTOS (6)
('Curso Derecho Penal', 'curso-derecho-penal',
'20 horas de contenido sobre derecho penal ecuatoriano',
'Domina el derecho penal', 49.99, 79.99, 'course', 'digital',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', 'active', true),

('Masterclass Derecho Aduanero', 'masterclass-aduanero',
'15 horas sobre comercio internacional y aduanas',
'Comercio exterior', 89.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800', 'active', false),

('Curso Derecho Laboral', 'curso-laboral',
'18 horas sobre relaciones laborales y contratos',
'Derecho laboral práctico', 49.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800', 'active', false),

('Curso Infracciones Tránsito', 'curso-transito',
'10 horas sobre infracciones y defensa vial',
'Defiéndete en tránsito', 39.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800', 'active', false),

('Masterclass Litigación Oral', 'masterclass-litigacion',
'12 horas de técnicas de litigación y oratoria',
'Conviértete en litigante', 79.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800', 'active', false),

('Curso Contratos', 'curso-contratos',
'16 horas sobre contratos civiles y mercantiles',
'Especialízate en contratos', 59.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800', 'active', false)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  status = EXCLUDED.status;

-- VERIFICACIÓN FINAL
SELECT 
  'SISTEMA COMPLETO CREADO' as resultado,
  (SELECT COUNT(*) FROM courses WHERE status = 'active') as cursos,
  (SELECT COUNT(*) FROM course_modules) as modulos,
  (SELECT COUNT(*) FROM course_lessons) as lecciones,
  (SELECT COUNT(*) FROM products WHERE status = 'active') as productos,
  (SELECT COUNT(*) FROM blog_posts WHERE status = 'published') as blogs;
