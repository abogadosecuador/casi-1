-- ===============================================
-- CONTENIDO COMPLETO PARA USUARIO FINAL
-- TODO FUNCIONAL - ENTORNO PRODUCCIÓN
-- ===============================================

-- ====================================
-- PARTE 1: PRODUCTOS Y SERVICIOS (22)
-- ====================================

INSERT INTO products (name, slug, description, short_description, price, compare_at_price, category, type, thumbnail, status, featured, metadata) VALUES

-- SERVICIOS LEGALES (6)
('Servicio de Derecho Penal', 'servicio-derecho-penal',
'Representación legal completa en casos penales. Incluye: defensa en audiencias, estrategia legal personalizada, análisis de pruebas, recursos legales y seguimiento del caso hasta sentencia.',
'Defensa legal completa en procesos penales',
500, 650, 'service', 'service',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'active', true, '{"deliverable":"Representación legal completa","duration":"Variable según caso","includes":["Audiencias","Estrategia legal","Recursos"]}'::jsonb),

('Servicio de Derecho Civil', 'servicio-derecho-civil',
'Asesoría y representación en casos civiles: contratos, herencias, sucesiones, divorcios, juicios de inquilinato y más.',
'Asesoría integral en derecho civil',
400, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', false, '{"deliverable":"Asesoría y representación","duration":"Variable","includes":["Contratos","Herencias","Divorcios"]}'::jsonb),

('Servicio de Derecho Comercial', 'servicio-derecho-comercial',
'Asesoría legal empresarial completa: constitución de empresas, contratos mercantiles, propiedad intelectual, litigios comerciales.',
'Servicios legales para empresas',
450, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'active', false, '{"deliverable":"Asesoría empresarial","duration":"Mensual o por proyecto","includes":["Constitución","Contratos","Litigios"]}'::jsonb),

('Servicio de Derecho Laboral', 'servicio-derecho-laboral',
'Defensa laboral completa: despidos injustificados, indemnizaciones, acoso laboral, negociación colectiva y mediación.',
'Defensa de derechos laborales',
350, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'active', false, '{"deliverable":"Defensa laboral","duration":"Variable","includes":["Despidos","Indemnizaciones","Mediación"]}'::jsonb),

('Servicio de Derecho de Tránsito', 'servicio-derecho-transito',
'Defensa en casos de tránsito: impugnación de multas, accidentes, recuperación de puntos, trámites ANT.',
'Representación legal en tránsito',
250, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
'active', false, '{"deliverable":"Defensa en tránsito","duration":"1-3 meses","includes":["Impugnaciones","Accidentes","ANT"]}'::jsonb),

('Servicio de Derecho Aduanero', 'servicio-derecho-aduanero',
'Especialistas en derecho aduanero: importaciones, exportaciones, clasificación arancelaria, recursos contra sanciones.',
'Asesoría en comercio exterior',
550, NULL, 'service', 'service',
'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
'active', false, '{"deliverable":"Asesoría aduanera","duration":"Por trámite","includes":["Importaciones","Exportaciones","Recursos"]}'::jsonb),

-- CONSULTAS (5)
('Consulta General', 'consulta-general',
'Consulta legal general de 1 hora para resolver dudas jurídicas puntuales en cualquier área del derecho.',
'Asesoría legal general - 1 hora',
80, 100, 'consultation', 'service',
'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
'active', false, '{"deliverable":"Consulta 1 hora","duration":"1 hora","format":"Presencial u online"}'::jsonb),

('Consulta Penal', 'consulta-penal',
'Consulta especializada en derecho penal: análisis de casos, estrategias de defensa, derechos del detenido.',
'Asesoría especializada en penal - 1 hora',
120, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'active', false, '{"deliverable":"Consulta penal 1 hora","duration":"1 hora","format":"Presencial u online"}'::jsonb),

('Consulta Civil', 'consulta-civil',
'Consulta en temas civiles: contratos, herencias, divorcios, propiedades, obligaciones.',
'Asesoría en derecho civil - 1 hora',
100, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', false, '{"deliverable":"Consulta civil 1 hora","duration":"1 hora","format":"Presencial u online"}'::jsonb),

('Consulta Empresarial', 'consulta-empresarial',
'Consulta legal para empresarios: constitución, contratos comerciales, derecho laboral empresarial.',
'Asesoría para empresas - 1 hora',
150, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'active', false, '{"deliverable":"Consulta empresarial 1 hora","duration":"1 hora","format":"Presencial u online"}'::jsonb),

('Consulta Digital/Online', 'consulta-digital-online',
'Consulta completamente virtual por videollamada. Ideal para clientes fuera de la ciudad.',
'Consulta legal por videollamada - 1 hora',
90, NULL, 'consultation', 'service',
'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800',
'active', false, '{"deliverable":"Consulta online 1 hora","duration":"1 hora","format":"Videollamada"}'::jsonb),

-- CURSOS (6)
('Curso Fundamentos de Derecho Penal', 'curso-fundamentos-derecho-penal',
'Curso completo sobre los principios básicos del derecho penal ecuatoriano. Incluye: COIP, teoría del delito, penas y procedimientos.',
'Aprende derecho penal desde cero',
49.99, 79.99, 'course', 'digital',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'active', true, '{"deliverable":"Acceso al curso online","duration":"20 horas","includes":["Videos","PDFs","Certificado"]}'::jsonb),

('Masterclass Derecho Aduanero', 'masterclass-derecho-aduanero',
'Todo sobre procedimientos aduaneros, comercio internacional, importaciones y exportaciones en Ecuador.',
'Especialízate en derecho aduanero',
89.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
'active', false, '{"deliverable":"Acceso al curso online","duration":"15 horas","includes":["Videos","Casos prácticos","Certificado"]}'::jsonb),

('Curso Infracciones de Tránsito y Defensa', 'curso-infracciones-transito',
'Guía completa sobre infracciones de tránsito, cómo impugnar multas y defender tus derechos.',
'Aprende a defenderte en tránsito',
39.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
'active', false, '{"deliverable":"Acceso al curso online","duration":"10 horas","includes":["Videos","Plantillas","Certificado"]}'::jsonb),

('Curso Derecho Laboral Práctico', 'curso-derecho-laboral-practico',
'Todo sobre relaciones laborales, contratos de trabajo, derechos del trabajador y procedimientos laborales.',
'Domina el derecho laboral ecuatoriano',
49.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'active', false, '{"deliverable":"Acceso al curso online","duration":"18 horas","includes":["Videos","Formularios","Certificado"]}'::jsonb),

('Masterclass Técnicas de Litigación Oral', 'masterclass-litigacion-oral',
'Técnicas avanzadas de litigación oral para audiencias. Oratoria forense, argumentación y persuasión.',
'Conviértete en un gran litigante',
79.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
'active', false, '{"deliverable":"Acceso al curso online","duration":"12 horas","includes":["Videos","Ejercicios","Certificado"]}'::jsonb),

('Curso Contratos y Obligaciones', 'curso-contratos-obligaciones',
'Curso especializado en contratos civiles y mercantiles. Elaboración, interpretación y ejecución.',
'Especialízate en contratos',
59.99, NULL, 'course', 'digital',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', false, '{"deliverable":"Acceso al curso online","duration":"16 horas","includes":["Videos","Plantillas","Certificado"]}'::jsonb),

-- EBOOKS (5)
('Guía Legal para Emprendedores', 'guia-legal-emprendedores',
'Ebook completo con todo lo que necesitas saber para iniciar tu negocio legalmente en Ecuador. Incluye plantillas y checklist.',
'Tu guía para emprender legalmente',
25, 39, 'ebook', 'digital',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'active', true, '{"deliverable":"PDF descargable","pages":"150","includes":["Guía completa","Plantillas","Checklist"]}'::jsonb),

('Introducción al Derecho Penal', 'introduccion-derecho-penal',
'Ebook sobre conceptos básicos del derecho penal ecuatoriano. Ideal para estudiantes y profesionales.',
'Fundamentos de derecho penal',
15, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'active', false, '{"deliverable":"PDF descargable","pages":"80","includes":["Teoría","Ejemplos","Casos"]}'::jsonb),

('Contratos Civiles y Mercantiles', 'contratos-civiles-mercantiles',
'Manual completo sobre contratos con +50 plantillas listas para usar y guía de elaboración.',
'50+ plantillas de contratos',
29.99, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', false, '{"deliverable":"PDF descargable","pages":"200","includes":["Guía","50+ plantillas","Ejemplos"]}'::jsonb),

('Derecho de Familia: Guía Práctica', 'derecho-familia-guia',
'Todo sobre derecho de familia en Ecuador: divorcios, pensiones, custodia y más con casos prácticos.',
'Guía completa de derecho familiar',
22.50, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'active', false, '{"deliverable":"PDF descargable","pages":"120","includes":["Guía","Formularios","Casos reales"]}'::jsonb),

('Derechos Fundamentales: Lo que Debes Saber', 'derechos-fundamentales-guia',
'Guía completa sobre derechos fundamentales en Ecuador. Conoce y defiende tus derechos.',
'Conoce tus derechos',
19.99, NULL, 'ebook', 'digital',
'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
'active', false, '{"deliverable":"PDF descargable","pages":"100","includes":["Guía completa","Casos","Recursos"]}'::jsonb)

ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  category = EXCLUDED.category,
  type = EXCLUDED.type,
  thumbnail = EXCLUDED.thumbnail,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured,
  metadata = EXCLUDED.metadata;

-- ====================================
-- PARTE 2: BLOG COMPLETO (10 ENTRADAS)
-- ====================================

INSERT INTO blog_posts (title, slug, excerpt, content, author_name, category, tags, thumbnail, status, featured) VALUES

('Derechos del Trabajador en Ecuador 2024', 'derechos-trabajador-ecuador-2024',
'Conoce tus derechos laborales: salario, vacaciones, beneficios sociales y protección ante despido.',
'Guía completa sobre los derechos del trabajador en Ecuador actualizada para 2024. Incluye salario básico, jornada laboral, vacaciones, décimos, fondos de reserva, seguridad social y protección ante despido.',
'Dr. Wilson Ipiales', 'Derecho Laboral',
ARRAY['derechos laborales', 'trabajador', 'código trabajo', 'salario', 'ecuador'],
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'published', true),

('Guía Completa del Divorcio en Ecuador 2024', 'guia-divorcio-ecuador-2024',
'Todo sobre el proceso de divorcio: tipos, requisitos, costos, plazos y pensión alimenticia.',
'Procedimiento completo paso a paso para divorciarse en Ecuador. Incluye divorcio de mutuo acuerdo y contencioso, documentos necesarios, costos, pensión alimenticia y custodia de hijos.',
'Dra. María González', 'Derecho de Familia',
ARRAY['divorcio', 'familia', 'matrimonio', 'custodia', 'pensión alimenticia'],
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'published', true),

('Cómo Constituir una Empresa en Ecuador 2024', 'constituir-empresa-ecuador-2024',
'Guía paso a paso: tipos de empresas, requisitos, costos, trámites y obligaciones.',
'Todo lo que necesitas saber para crear tu empresa legalmente. Incluye tipos de empresas (Persona Natural, Cía. Ltda., S.A., S.A.S.), proceso completo, costos y obligaciones posteriores.',
'Abg. Carlos Ruiz', 'Derecho Comercial',
ARRAY['empresa', 'constitución', 'emprendimiento', 'RUC', 'negocios'],
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'published', true),

('Pensiones Alimenticias: Tabla Actualizada 2024', 'pensiones-alimenticias-2024',
'Tabla oficial de pensiones alimenticias según ingresos del alimentante.',
'Todo sobre pensiones alimenticias en Ecuador: tabla oficial 2024, cálculos, procedimiento legal, derechos del alimentado e incumplimiento.',
'Dr. Wilson Ipiales', 'Derecho de Familia',
ARRAY['pensión alimenticia', 'alimentos', 'familia', 'tabla', 'hijos'],
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'published', false),

('Defensa Penal: Qué Hacer Si Te Detienen', 'defensa-penal-detencion',
'Conoce tus derechos si eres detenido y cómo proceder legalmente.',
'Guía práctica sobre defensa penal: derechos durante la detención, flagrancia, abogado defensor, procedimiento de indagación previa y juicio.',
'Dr. Wilson Ipiales', 'Derecho Penal',
ARRAY['defensa penal', 'detención', 'derechos', 'flagrancia', 'COIP'],
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'published', false),

('Infracciones de Tránsito: Cómo Impugnar Multas', 'infracciones-transito-impugnar',
'Procedimiento para impugnar multas de tránsito y recuperar puntos de licencia.',
'Guía legal sobre infracciones de tránsito en Ecuador: tipos de multas, procedimiento de impugnación, recuperación de puntos y recursos ante la ANT.',
'Abg. Carlos Ruiz', 'Derecho de Tránsito',
ARRAY['tránsito', 'multas', 'infracciones', 'ANT', 'licencia'],
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
'published', false),

('Contratos Laborales: Lo que Debes Saber', 'contratos-laborales-guia',
'Tipos de contratos laborales, cláusulas importantes y derechos del trabajador.',
'Todo sobre contratos de trabajo en Ecuador: tipos de contratos, período de prueba, jornadas, remuneración y terminación del contrato.',
'Dra. María González', 'Derecho Laboral',
ARRAY['contratos', 'laboral', 'trabajo', 'empleador', 'trabajador'],
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'published', false),

('Indemnizaciones por Despido Intempestivo', 'indemnizaciones-despido',
'Cálculo de indemnizaciones y proceso legal ante despido injustificado.',
'Guía completa sobre indemnizaciones laborales en Ecuador: cálculo, plazos, procedimiento de reclamo y visto bueno.',
'Dr. Wilson Ipiales', 'Derecho Laboral',
ARRAY['despido', 'indemnización', 'laboral', 'trabajo', 'visto bueno'],
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'published', false),

('Contratos de Compraventa: Guía Legal', 'contratos-compraventa-guia',
'Elementos esenciales de un contrato de compraventa y cómo protegerte.',
'Todo sobre contratos de compraventa en Ecuador: elementos, cláusulas esenciales, riesgos y garantías.',
'Abg. Carlos Ruiz', 'Derecho Civil',
ARRAY['compraventa', 'contrato', 'civil', 'propiedad', 'bienes'],
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'published', false),

('Herencias y Sucesiones en Ecuador', 'herencias-sucesiones-ecuador',
'Proceso sucesorio, herederos legítimos, testamentos y trámites para herencias.',
'Guía práctica sobre herencias y sucesiones: sucesión intestada y testamentaria, herederos, partición de bienes y trámites notariales.',
'Dra. María González', 'Derecho Civil',
ARRAY['herencia', 'sucesión', 'testamento', 'herederos', 'bienes'],
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'published', false)

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  author_name = EXCLUDED.author_name,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  thumbnail = EXCLUDED.thumbnail,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

-- Actualizar vistas aleatoriamente
UPDATE blog_posts SET views_count = (RANDOM() * 1500 + 100)::INTEGER WHERE views_count < 100;

-- ====================================
-- VERIFICACIÓN Y ESTADÍSTICAS
-- ====================================

-- Resumen de productos
SELECT 
  CASE 
    WHEN type = 'service' AND category != 'consultation' THEN 'Servicios Legales'
    WHEN category = 'consultation' THEN 'Consultas'
    WHEN category = 'course' THEN 'Cursos'
    WHEN category = 'ebook' THEN 'E-books'
    ELSE 'Otros'
  END as tipo,
  COUNT(*) as cantidad,
  STRING_AGG(name, ', ' ORDER BY price DESC) as productos
FROM products
WHERE status = 'active'
GROUP BY 
  CASE 
    WHEN type = 'service' AND category != 'consultation' THEN 'Servicios Legales'
    WHEN category = 'consultation' THEN 'Consultas'
    WHEN category = 'course' THEN 'Cursos'
    WHEN category = 'ebook' THEN 'E-books'
    ELSE 'Otros'
  END
ORDER BY cantidad DESC;

-- Resumen de blog
SELECT 
  category,
  COUNT(*) as entradas,
  COUNT(*) FILTER (WHERE featured = true) as destacadas,
  STRING_AGG(title, ', ' ORDER BY created_at DESC) as titulos
FROM blog_posts
WHERE status = 'published'
GROUP BY category
ORDER BY entradas DESC;

-- Verificacion final
SELECT 
  'CONTENIDO INSERTADO EXITOSAMENTE' as mensaje,
  (SELECT COUNT(*) FROM products WHERE status = 'active') as productos_activos,
  (SELECT COUNT(*) FROM blog_posts WHERE status = 'published') as blog_publicados,
  (SELECT COUNT(*) FROM courses WHERE status = 'active') as cursos_activos;
