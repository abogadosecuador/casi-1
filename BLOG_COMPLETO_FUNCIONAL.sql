-- ===============================================
-- BLOG COMPLETO FUNCIONAL - USUARIO FINAL
-- Insertar entradas de blog profesionales
-- ===============================================

-- Insertar entradas de blog completas
INSERT INTO blog_posts (title, slug, excerpt, content, author_name, category, tags, thumbnail, status, featured, published_at) VALUES

('Derechos del Trabajador en Ecuador 2024', 'derechos-trabajador-ecuador-2024',
'Conoce tus derechos laborales: salario, vacaciones, beneficios y protección ante despido.',
'Guía completa sobre los derechos del trabajador en Ecuador actualizada para 2024.',
'Dr. Wilson Ipiales', 'Derecho Laboral',
ARRAY['derechos laborales', 'trabajador', 'salario', 'ecuador'],
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'published', true, NOW()),

('Guía Completa para Divorciarse en Ecuador', 'guia-divorciarse-ecuador',
'Todo sobre el proceso de divorcio: requisitos, costos, plazos y tipos de divorcio.',
'Procedimiento completo paso a paso para divorciarse en Ecuador.',
'Dra. María González', 'Derecho de Familia',
ARRAY['divorcio', 'familia', 'matrimonio', 'ecuador'],
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'published', true, NOW()),

('Cómo Constituir una Empresa en Ecuador', 'constituir-empresa-ecuador',
'Paso a paso para crear tu empresa: tipos de empresas, requisitos y costos.',
'Guía completa para emprendedores sobre constitución de empresas.',
'Abg. Carlos Ruiz', 'Derecho Comercial',
ARRAY['empresa', 'constitución', 'emprendimiento', 'RUC'],
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'published', true, NOW()),

('Pensiones Alimenticias: Tabla Actualizada 2024', 'pensiones-alimenticias-2024',
'Tabla oficial de pensiones alimenticias según ingresos del alimentante.',
'Todo sobre pensiones alimenticias, cálculos y procedimiento legal.',
'Dr. Wilson Ipiales', 'Derecho de Familia',
ARRAY['pensión alimenticia', 'alimentos', 'familia', 'tabla'],
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'published', false, NOW()),

('Defensa Penal: Qué Hacer Si Te Detienen', 'defensa-penal-detencion',
'Conoce tus derechos si eres detenido y cómo proceder legalmente.',
'Guía práctica sobre defensa penal y derechos durante una detención.',
'Dr. Wilson Ipiales', 'Derecho Penal',
ARRAY['defensa penal', 'detención', 'derechos', 'flagrancia'],
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'published', false, NOW()),

('Infracciones de Tránsito: Cómo Impugnar Multas', 'infracciones-transito-impugnar',
'Procedimiento para impugnar multas de tránsito y recuperar puntos.',
'Guía legal sobre infracciones de tránsito en Ecuador.',
'Abg. Carlos Ruiz', 'Derecho de Tránsito',
ARRAY['tránsito', 'multas', 'infracciones', 'ANT'],
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
'published', false, NOW()),

('Contratos Laborales: Lo que Debes Saber', 'contratos-laborales-guia',
'Tipos de contratos laborales, cláusulas importantes y derechos del trabajador.',
'Todo sobre contratos de trabajo en Ecuador.',
'Dra. María González', 'Derecho Laboral',
ARRAY['contratos', 'laboral', 'trabajo', 'empleador'],
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'published', false, NOW()),

('Indemnizaciones por Despido Intempestivo', 'indemnizaciones-despido',
'Cálculo de indemnizaciones y proceso legal ante despido injustificado.',
'Guía completa sobre indemnizaciones laborales en Ecuador.',
'Dr. Wilson Ipiales', 'Derecho Laboral',
ARRAY['despido', 'indemnización', 'laboral', 'trabajo'],
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'published', false, NOW()),

('Contratos de Compraventa: Guía Legal', 'contratos-compraventa-guia',
'Elementos esenciales de un contrato de compraventa y cómo protegerte.',
'Todo sobre contratos de compraventa en Ecuador.',
'Abg. Carlos Ruiz', 'Derecho Civil',
'ARRAY['compraventa', 'contrato', 'civil', 'propiedad'],
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'published', false, NOW()),

('Herencias y Sucesiones en Ecuador', 'herencias-sucesiones-ecuador',
'Proceso sucesorio, herederos legítimos y trámites para herencias.',
'Guía práctica sobre herencias y sucesiones.',
'Dra. María González', 'Derecho Civil',
ARRAY['herencia', 'sucesión', 'testamento', 'herederos'],
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'published', false, NOW())

ON CONFLICT (slug) DO NOTHING;

-- Actualizar contador de vistas aleatoriamente
UPDATE blog_posts SET views_count = (RANDOM() * 1000)::INTEGER WHERE views_count = 0;

-- Mensaje de confirmación
SELECT 
  COUNT(*) as total_entradas,
  COUNT(*) FILTER (WHERE status = 'published') as publicadas,
  COUNT(*) FILTER (WHERE featured = true) as destacadas
FROM blog_posts;

-- Verificar que se crearon correctamente
SELECT id, title, status, category FROM blog_posts ORDER BY created_at DESC LIMIT 10;
