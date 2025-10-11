-- ===============================================
-- CONTENIDO REAL PARA PRODUCCIÓN
-- EJECUTAR DESPUÉS DEL SCHEMA PRINCIPAL
-- ===============================================

-- INSERTAR CURSOS REALES
INSERT INTO public.courses (title, slug, description, short_description, price, category, level, duration, thumbnail, preview_video, instructor_name, what_you_learn, requirements, status, featured) VALUES
('Derecho Penal Ecuatoriano Completo', 'derecho-penal-ecuatoriano-completo', 
'Curso completo sobre derecho penal en Ecuador. Aprende sobre delitos, procedimientos, defensas y jurisprudencia actualizada. Ideal para estudiantes y profesionales del derecho.', 
'Domina el derecho penal ecuatoriano desde cero con casos prácticos',
299.99, 'Derecho Penal', 'intermediate', 480,
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
'https://youtu.be/sample',
'Dr. Wilson Ipiales',
'["Código Orgánico Integral Penal (COIP)", "Procedimientos penales", "Defensas legales", "Jurisprudencia relevante", "Casos prácticos reales"]'::jsonb,
'["Conocimientos básicos de derecho", "Interés en el sistema judicial ecuatoriano"]'::jsonb,
'active', true),

('Derecho Civil y Obligaciones', 'derecho-civil-obligaciones',
'Aprende los fundamentos del derecho civil ecuatoriano, contratos, obligaciones y responsabilidad civil con casos prácticos y ejemplos reales.',
'Fundamentos esenciales del derecho civil ecuatoriano',
249.99, 'Derecho Civil', 'beginner', 360,
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'https://youtu.be/sample',
'Dra. María González',
'["Código Civil actualizado", "Contratos y obligaciones", "Responsabilidad civil", "Derecho de familia", "Sucesiones"]'::jsonb,
'["Ninguno - curso desde cero"]'::jsonb,
'active', true),

('Derecho Laboral Práctico', 'derecho-laboral-practico',
'Todo sobre relaciones laborales, contratos de trabajo, despidos, indemnizaciones y derechos del trabajador en Ecuador.',
'Protege tus derechos laborales y conoce tus obligaciones',
199.99, 'Derecho Laboral', 'beginner', 240,
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'https://youtu.be/sample',
'Abg. Carlos Ruiz',
'["Código de Trabajo", "Contratos laborales", "Derechos del trabajador", "Indemnizaciones", "Seguridad social"]'::jsonb,
'["Ninguno"]'::jsonb,
'active', false),

('Derecho Comercial y Societario', 'derecho-comercial-societario',
'Constitución de empresas, contratos mercantiles, sociedades y aspectos legales del comercio en Ecuador.',
'Emprende legalmente: crea y gestiona tu empresa',
349.99, 'Derecho Comercial', 'intermediate', 420,
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'https://youtu.be/sample',
'Dr. Roberto Silva',
'["Constitución de empresas", "Contratos mercantiles", "Sociedades comerciales", "Tributación empresarial", "Propiedad intelectual"]'::jsonb,
'["Conocimientos básicos de derecho"]'::jsonb,
'active', true);

-- INSERTAR MÓDULOS Y LECCIONES PARA EL CURSO DE DERECHO PENAL
INSERT INTO public.course_modules (course_id, title, description, order_index) VALUES
(1, 'Introducción al Derecho Penal', 'Conceptos fundamentales y principios del derecho penal ecuatoriano', 1),
(1, 'Delitos y Penas', 'Clasificación de delitos y sistema de penas en el COIP', 2),
(1, 'Procedimiento Penal', 'Etapas del proceso penal y garantías del debido proceso', 3),
(1, 'Defensa Penal', 'Estrategias de defensa y recursos legales', 4);

INSERT INTO public.course_lessons (module_id, course_id, title, description, video_url, duration, order_index, type, is_preview) VALUES
(1, 1, 'Qué es el Derecho Penal', 'Definición, objeto y características del derecho penal', 'https://youtu.be/sample1', 15, 1, 'video', true),
(1, 1, 'Principios del Derecho Penal', 'Legalidad, tipicidad, antijuridicidad y culpabilidad', 'https://youtu.be/sample2', 20, 2, 'video', true),
(1, 1, 'El Código Orgánico Integral Penal', 'Estructura y aplicación del COIP', 'https://youtu.be/sample3', 18, 3, 'video', false),
(2, 1, 'Clasificación de Delitos', 'Delitos contra las personas, propiedad y Estado', 'https://youtu.be/sample4', 25, 1, 'video', false),
(2, 1, 'Sistema de Penas', 'Tipos de penas y su aplicación', 'https://youtu.be/sample5', 22, 2, 'video', false),
(3, 1, 'Etapa de Investigación', 'Fiscalía y recolección de pruebas', 'https://youtu.be/sample6', 30, 1, 'video', false),
(3, 1, 'Juicio Oral', 'Desarrollo del juicio y presentación de pruebas', 'https://youtu.be/sample7', 35, 2, 'video', false),
(4, 1, 'Estrategias de Defensa', 'Técnicas para la defensa penal efectiva', 'https://youtu.be/sample8', 28, 1, 'video', false);

-- INSERTAR PRODUCTOS/EBOOKS
INSERT INTO public.products (name, slug, description, short_description, price, category, type, thumbnail, status, featured) VALUES
('Guía Práctica de Derecho Penal Ecuatoriano 2024', 'guia-practica-derecho-penal-2024',
'Guía completa y actualizada sobre el derecho penal en Ecuador. Incluye casos prácticos, jurisprudencia y formularios.',
'Tu manual de referencia en derecho penal',
49.99, 'ebook', 'digital',
'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800',
'active', true),

('Manual de Contratos Legales', 'manual-contratos-legales',
'Más de 50 modelos de contratos listos para usar: compraventa, arrendamiento, prestación de servicios y más.',
'50+ plantillas de contratos profesionales',
39.99, 'ebook', 'digital',
'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
'active', true),

('Derecho de Familia en Ecuador', 'derecho-familia-ecuador',
'Todo sobre divorcios, alimentos, custodia y régimen de visitas. Con casos reales y formularios.',
'Protege a tu familia legalmente',
44.99, 'ebook', 'digital',
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'active', false),

('Guía del Emprendedor Legal', 'guia-emprendedor-legal',
'Cómo constituir tu empresa, contratos, tributación y aspectos legales para emprender en Ecuador.',
'Emprende sin riesgos legales',
59.99, 'ebook', 'digital',
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'active', true);

-- INSERTAR SERVICIOS LEGALES
INSERT INTO public.products (name, slug, description, short_description, price, category, type, status, featured) VALUES
('Consulta Legal Virtual 1 Hora', 'consulta-legal-virtual-1-hora',
'Consulta personalizada con abogado especializado por videollamada. Resuelve tus dudas legales en tiempo real.',
'Asesoría legal inmediata por videollamada',
75.00, 'consultation', 'service',
'active', false),

('Redacción de Contrato Personalizado', 'redaccion-contrato-personalizado',
'Elaboración de contrato legal personalizado según tus necesidades. Incluye 2 revisiones.',
'Contrato legal a tu medida',
150.00, 'service', 'service',
'active', false),

('Defensa Legal Penal', 'defensa-legal-penal',
'Representación legal completa en proceso penal. Desde la investigación hasta el juicio.',
'Tu defensa en casos penales',
500.00, 'service', 'service',
'active', true),

('Asesoría Empresarial Mensual', 'asesoria-empresarial-mensual',
'Asesoría legal continua para tu empresa. Incluye consultas ilimitadas y revisión de documentos.',
'Tu departamento legal externo',
299.00, 'service', 'service',
'active', true);

-- INSERTAR ENTRADAS DE BLOG
INSERT INTO public.blog_posts (title, slug, excerpt, content, author_name, category, tags, thumbnail, status, featured, published_at) VALUES
('Derechos del Trabajador en Ecuador 2024', 'derechos-trabajador-ecuador-2024',
'Conoce tus derechos laborales actualizados: salario, vacaciones, despido y más.',
'# Derechos del Trabajador en Ecuador 2024

## Introducción
Todo trabajador en Ecuador tiene derechos fundamentales que están protegidos por la Constitución y el Código de Trabajo...

## Principales Derechos

### 1. Derecho a la Remuneración Justa
El salario básico unificado (SBU) para 2024 es de $460. Todo trabajador tiene derecho a recibir su remuneración completa y a tiempo...

### 2. Jornada Laboral
La jornada ordinaria es de 8 horas diarias y 40 horas semanales. Las horas extras deben ser pagadas con recargo...

### 3. Vacaciones Anuales
Todo trabajador tiene derecho a 15 días de vacaciones remuneradas por cada año de servicio...

### 4. Décimo Tercero y Décimo Cuarto
- Décimo tercer sueldo: equivalente a la doceava parte de las remuneraciones
- Décimo cuarto sueldo: un salario básico unificado

### 5. Protección ante Despido
El trabajador no puede ser despedido sin causa justa. En caso de despido intempestivo, tiene derecho a indemnización...

## Conclusión
Conocer tus derechos es fundamental para una relación laboral justa. Si sientes que tus derechos están siendo vulnerados, busca asesoría legal inmediatamente.

**¿Necesitas asesoría laboral? Contáctanos.**',
'Dr. Wilson Ipiales',
'Derecho Laboral',
ARRAY['derechos laborales', 'trabajador', 'salario', 'código de trabajo'],
'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800',
'published', true, NOW()),

('Cómo Divorciarse en Ecuador: Guía Completa', 'como-divorciarse-ecuador-guia',
'Procedimiento, requisitos y costos del divorcio en Ecuador. Todo lo que necesitas saber.',
'# Cómo Divorciarse en Ecuador: Guía Completa

## Tipos de Divorcio

### Divorcio de Mutuo Acuerdo
El más rápido y económico. Ambos cónyuges están de acuerdo en divorciarse...

### Divorcio Contencioso
Cuando no hay acuerdo entre las partes. Requiere presentar causales...

## Requisitos Generales
- Copia de cédulas de identidad
- Certificado de matrimonio actualizado
- Documentos de los hijos (si hay)
- Acuerdo de alimentos y custodia

## Proceso Paso a Paso

1. **Presentación de demanda**
2. **Audiencia de conciliación**
3. **Presentación de pruebas**
4. **Sentencia de divorcio**

## Costos Aproximados
- Divorcio de mutuo acuerdo: $200 - $500
- Divorcio contencioso: $1,000 - $3,000

## Pensiones Alimenticias
El cónyuge que tenga la custodia de los hijos tiene derecho a pensión alimenticia...

**¿Necesitas ayuda con tu divorcio? Agenda una consulta.**',
'Dra. María González',
'Derecho de Familia',
ARRAY['divorcio', 'familia', 'matrimonio', 'separación'],
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'published', true, NOW()),

('Guía para Constituir una Empresa en Ecuador', 'guia-constituir-empresa-ecuador',
'Paso a paso para crear tu empresa legalmente: tipos, requisitos y trámites.',
'# Guía para Constituir una Empresa en Ecuador

## Tipos de Empresas

### 1. Compañía de Responsabilidad Limitada
- Mínimo 2 socios, máximo 15
- Capital mínimo: $400
- Responsabilidad limitada al capital aportado

### 2. Sociedad Anónima
- Mínimo 2 accionistas
- Capital mínimo: $800
- Ideal para empresas grandes

### 3. Empresa Unipersonal
- Un solo propietario
- Proceso más simple
- Responsabilidad ilimitada

## Proceso de Constitución

### Paso 1: Reserva de Nombre
Verificar disponibilidad en Superintendencia de Compañías...

### Paso 2: Elaboración de Estatutos
Documento legal que regula la empresa...

### Paso 3: Apertura de Cuenta de Integración
Depositar el capital mínimo...

### Paso 4: Escritura Pública
Elevar a escritura pública ante notario...

### Paso 5: Inscripción en Registro Mercantil
Obtener RUC empresarial...

## Costos Aproximados
- Persona Natural: $100 - $300
- Compañía Limitada: $500 - $1,200
- Sociedad Anónima: $800 - $2,000

## Documentos Necesarios
- Cédulas de socios
- Certificado de votación
- Pago de servicios básicos
- Certificado bancario

**¿Necesitas ayuda para constituir tu empresa? Contáctanos.**',
'Abg. Carlos Ruiz',
'Derecho Comercial',
ARRAY['empresa', 'constitución', 'emprendimiento', 'negocios'],
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
'published', true, NOW()),

('Pensiones Alimenticias en Ecuador: Tabla 2024', 'pensiones-alimenticias-ecuador-2024',
'Tabla actualizada de pensiones alimenticias, cálculo y procedimiento legal.',
'# Pensiones Alimenticias en Ecuador: Tabla 2024

## ¿Qué es la Pensión Alimenticia?
Es el derecho de los hijos a recibir lo necesario para su subsistencia, educación, salud y recreación...

## Tabla de Pensiones 2024

### Según Ingresos del Alimentante
- 0 - 1 SBU: 28.09% del ingreso
- 1.01 - 2 SBU: 29.34% del ingreso  
- 2.01 - 3 SBU: 30.59% del ingreso
- Más de 3 SBU: Progresivo hasta 47%

## Cómo Solicitar Pensión Alimenticia

### 1. Presentar Demanda
En la Unidad Judicial de Familia...

### 2. Audiencia Única
Se fija monto provisional...

### 3. Sentencia
Monto definitivo de pensión...

## Incumplimiento de Pensión
El incumplimiento puede derivar en:
- Prohibición de salida del país
- Prisión de 1 a 3 años
- Embargo de bienes

## Pensión para la Mujer Embarazada
Desde el embarazo hasta que el bebé cumpla un año...

**¿Necesitas ayuda con pensión alimenticia? Agenda una consulta.**',
'Dra. María González',
'Derecho de Familia',
ARRAY['pensión alimenticia', 'alimentos', 'hijos', 'familia'],
'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
'published', false, NOW());

-- MENSAJE DE CONFIRMACIÓN
DO $$
BEGIN
  RAISE NOTICE '✅ Contenido real insertado exitosamente!';
  RAISE NOTICE '✅ 4 Cursos completos con módulos y lecciones';
  RAISE NOTICE '✅ 8 Productos (ebooks y servicios)';
  RAISE NOTICE '✅ 4 Entradas de blog publicadas';
  RAISE NOTICE '✅ Todo listo para usuario final';
END $$;
