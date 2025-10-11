-- ===============================================
-- PRODUCTOS EXACTOS DE LA TIENDA
-- Los mismos que se ven en /tienda
-- ===============================================

-- Limpiar productos existentes (opcional)
-- DELETE FROM products;

-- INSERTAR EXACTAMENTE LOS PRODUCTOS DE LA TIENDA

-- ====== SERVICIOS LEGALES ======
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category, type, thumbnail, status, featured, created_at) VALUES

('Servicio de Derecho Penal', 'servicio-derecho-penal',
'Representación legal completa en casos penales, defensa penal profesional',
'Defensa legal completa en procesos penales con estrategias personalizadas y efectivas',
500, 650, 'service', 'service',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'active', true, NOW()),

('Servicio de Derecho Civil', 'servicio-derecho-civil',
'Asesoría y representación en casos civiles, contratos, herencias, y más',
'Asesoría en contratos, propiedades, sucesiones y obligaciones con enfoque práctico',
400, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', false, NOW()),

('Servicio de Derecho Comercial', 'servicio-derecho-comercial',
'Asesoría legal empresarial, constitución de compañías, contratos comerciales',
'Servicios legales para empresas y emprendedores con visión estratégica de negocios',
450, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'active', false, NOW()),

('Servicio de Derecho Laboral', 'servicio-derecho-laboral',
'Defensa laboral, despidos, indemnizaciones, acoso laboral',
'Defensa de derechos laborales para trabajadores y asesoría a empleadores',
350, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'active', false, NOW()),

('Servicio de Derecho de Tránsito', 'servicio-derecho-transito',
'Infracciones de tránsito, accidentes, defensa en casos viales',
'Representación legal en infracciones y accidentes de tránsito con alta tasa de éxito',
250, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
'active', false, NOW()),

('Servicio de Derecho Aduanero', 'servicio-derecho-aduanero',
'Trámites aduaneros, importaciones, exportaciones, comercio exterior',
'Especialistas en normativa aduanera, importaciones y exportaciones de mercancías',
550, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
'active', false, NOW()),

-- ====== CONSULTAS ======

('Consulta General', 'consulta-general',
'Consulta legal general para resolver dudas legales puntuales',
'Asesoría legal general para cualquier tema jurídico',
80, 100, 'consultation', 'service',
'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
'active', false, NOW()),

('Consulta Penal', 'consulta-penal',
'Consulta especializada en derecho penal, análisis de casos penales',
'Asesoría especializada en derecho penal y defensa',
120, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'active', false, NOW()),

('Consulta Civil', 'consulta-civil',
'Consulta en temas civiles: contratos, herencias, divorcios',
'Asesoría en derecho civil, contratos y obligaciones',
100, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', false, NOW()),

('Consulta Empresarial', 'consulta-empresarial',
'Consulta para empresarios sobre derecho comercial y laboral',
'Asesoría legal para empresas y emprendedores',
150, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'active', false, NOW()),

('Consulta Digital/Online', 'consulta-digital-online',
'Consulta completamente virtual por videollamada',
'Consulta legal por videollamada desde cualquier lugar',
90, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800',
'active', false, NOW()),

-- ====== CURSOS ======

('Curso Fundamentos de Derecho Penal', 'curso-fundamentos-derecho-penal',
'Aprende los principios básicos del Derecho Penal ecuatoriano',
'Curso completo sobre fundamentos del derecho penal',
49.99, 79.99, 'course', 'digital',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'active', true, NOW()),

('Masterclass Derecho Aduanero', 'masterclass-derecho-aduanero',
'Todo sobre procedimientos aduaneros y comercio internacional',
'Curso especializado en derecho aduanero y comercio exterior',
89.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
'active', false, NOW()),

('Curso Infracciones de Tránsito y Defensa', 'curso-infracciones-transito',
'Guía completa sobre infracciones de tránsito',
'Aprende a defenderte en casos de infracciones de tránsito',
39.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
'active', false, NOW()),

('Curso Derecho Laboral Práctico', 'curso-derecho-laboral-practico',
'Todo sobre relaciones laborales y contratos de trabajo',
'Curso práctico de derecho laboral ecuatoriano',
49.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'active', false, NOW()),

('Masterclass Técnicas de Litigación Oral', 'masterclass-litigacion-oral',
'Técnicas avanzadas de litigación oral para audiencias',
'Domina las técnicas de litigación y oratoria forense',
79.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
'active', false, NOW()),

('Curso Contratos y Obligaciones', 'curso-contratos-obligaciones',
'Curso especializado en contratos civiles y mercantiles',
'Aprende sobre contratos, obligaciones y derecho civil',
59.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', false, NOW()),

-- ====== EBOOKS ======

('Guía Legal para Emprendedores', 'guia-legal-emprendedores',
'Todo lo que necesitas saber para iniciar tu negocio',
'Guía completa para emprendedores sobre aspectos legales',
25, 39, 'ebook', 'digital',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'active', true, NOW()),

('Introducción al Derecho Penal', 'introduccion-derecho-penal',
'Conceptos básicos del derecho penal',
'Introducción completa al derecho penal ecuatoriano',
15, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'active', false, NOW()),

('Contratos Civiles y Mercantiles', 'contratos-civiles-mercantiles',
'Todo sobre contratos y su aplicación práctica',
'Manual completo de contratos civiles y mercantiles',
29.99, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', false, NOW()),

('Derecho de Familia: Guía Práctica', 'derecho-familia-guia',
'Todo sobre derecho de familia, divorcios y custodia',
'Guía práctica sobre derecho de familia en Ecuador',
22.50, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'active', false, NOW()),

('Derechos Fundamentales: Lo que Debes Saber', 'derechos-fundamentales-guia',
'Guía completa sobre derechos fundamentales',
'Conoce y defiende tus derechos fundamentales',
19.99, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
'active', false, NOW())

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  category = EXCLUDED.category,
  type = EXCLUDED.type,
  thumbnail = EXCLUDED.thumbnail,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

-- Verificar que se insertaron correctamente
SELECT 
  COUNT(*) as total_productos,
  COUNT(*) FILTER (WHERE type = 'service') as servicios,
  COUNT(*) FILTER (WHERE category = 'consultation') as consultas,
  COUNT(*) FILTER (WHERE category = 'course') as cursos,
  COUNT(*) FILTER (WHERE category = 'ebook') as ebooks
FROM products;

-- Mostrar resumen por categoría
SELECT 
  CASE 
    WHEN type = 'service' AND category != 'consultation' THEN 'Servicios Legales'
    WHEN category = 'consultation' THEN 'Consultas'
    WHEN category = 'course' THEN 'Cursos'
    WHEN category = 'ebook' THEN 'E-books'
    ELSE 'Otros'
  END as categoria,
  COUNT(*) as cantidad,
  STRING_AGG(name, ', ') as productos
FROM products
GROUP BY 
  CASE 
    WHEN type = 'service' AND category != 'consultation' THEN 'Servicios Legales'
    WHEN category = 'consultation' THEN 'Consultas'
    WHEN category = 'course' THEN 'Cursos'
    WHEN category = 'ebook' THEN 'E-books'
    ELSE 'Otros'
  END
ORDER BY cantidad DESC;

-- Mensaje de confirmación
DO $$
BEGIN
  RAISE NOTICE '✅ PRODUCTOS EXACTOS DE LA TIENDA INSERTADOS';
  RAISE NOTICE '✅ Total: 22 productos';
  RAISE NOTICE '✅ 6 Servicios Legales';
  RAISE NOTICE '✅ 5 Consultas';
  RAISE NOTICE '✅ 6 Cursos';
  RAISE NOTICE '✅ 5 E-books';
  RAISE NOTICE '✅ Ahora tienda y dashboard admin tienen los mismos productos';
END $$;
