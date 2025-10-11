# 🚨 ERROR: TABLAS NO EXISTEN - SOLUCIÓN INMEDIATA

## ❌ PROBLEMA

El error muestra:
```
"Could not find the table 'public.products'"
"Could not find the table 'public.courses'"
"Could not find the table 'public.blog_posts'"
```

**Las tablas NO existen en Supabase porque el SQL no se ha ejecutado.**

---

## ✅ SOLUCIÓN EN 3 PASOS (5 MINUTOS)

### PASO 1: Abrir Supabase

```
1. Ir a: https://supabase.com/dashboard
2. Seleccionar proyecto: kbybhgxqdefuquybstqk
3. En menú lateral izquierdo, clic en: SQL Editor (ícono </> )
4. Clic en botón verde: "+ New query"
```

### PASO 2: Ejecutar SQL Mínimo

```
1. Abrir el archivo: CREAR_TABLAS_MINIMO.sql
2. Seleccionar TODO (Ctrl+A)
3. Copiar (Ctrl+C)
4. Volver a Supabase SQL Editor
5. Pegar (Ctrl+V)
6. Clic en botón verde "RUN" (esquina inferior derecha)
7. Esperar mensaje: "Success. No rows returned"
```

### PASO 3: Verificar

```
1. En Supabase, ir a "Table Editor" (menú lateral)
2. Debes ver estas tablas:
   ✅ products
   ✅ courses
   ✅ course_modules
   ✅ course_lessons
   ✅ blog_posts
   
3. Clic en "products" → Debes ver 1 registro de prueba
4. Clic en "courses" → Debes ver 1 registro de prueba
5. Clic en "blog_posts" → Debes ver 1 registro de prueba
```

---

## 🔄 LUEGO RECARGAR APLICACIÓN

```bash
# En tu terminal, detener el servidor (Ctrl+C)
# Luego volver a iniciar:
npm run dev
```

O simplemente **recargar el navegador** (F5)

---

## ✅ VERIFICACIÓN QUE FUNCIONÓ

En el navegador, abrir consola (F12) y deberías ver:

```
✅ Conexión con Supabase establecida correctamente
✅ Sin errores 404
✅ Los componentes cargan sin errores
```

En la aplicación:

```
1. Login como admin
2. Ir a /admin
3. Clic en "Productos"
4. Debes ver al menos 1 producto
5. Clic en "Cursos"  
6. Debes ver al menos 1 curso
7. Clic en "Blog"
8. Debes ver al menos 1 entrada
```

---

## 🆘 SI AÚN HAY ERRORES

### Error: "permission denied"

**Solución:**
```sql
-- Ejecuta esto en SQL Editor:
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
```

### Error: "relation already exists"

**Solución:**
Las tablas ya existen. Solo necesitas insertar datos:

```sql
-- Ejecuta solo la parte de INSERT del archivo INSERTAR_CONTENIDO_REAL.sql
```

### Error: "Auth session missing"

**Solución:**
1. Logout de la aplicación
2. Ir a /register
3. Crear nuevo usuario
4. En Supabase SQL Editor:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'tu_email@example.com';
```

---

## 📞 CHECKLIST FINAL

- [ ] Abriste Supabase Dashboard
- [ ] Fuiste a SQL Editor
- [ ] Ejecutaste CREAR_TABLAS_MINIMO.sql
- [ ] Viste mensaje "Success"
- [ ] Verificaste en Table Editor que existen las tablas
- [ ] Recargaste la aplicación (F5)
- [ ] Login como admin
- [ ] Productos, Cursos y Blog cargan sin errores

---

## ⚡ ATAJO RÁPIDO

Si tienes acceso a la terminal de Supabase o psql:

```bash
psql -h db.kbybhgxqdefuquybstqk.supabase.co -U postgres -d postgres < CREAR_TABLAS_MINIMO.sql
```

---

## 📧 ÚLTIMA OPCIÓN

Si nada funciona, copia y pega este SQL minimalista directo en Supabase:

```sql
CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, slug TEXT UNIQUE, price DECIMAL, status TEXT DEFAULT 'active');
CREATE TABLE courses (id SERIAL PRIMARY KEY, title TEXT, slug TEXT UNIQUE, price DECIMAL, status TEXT DEFAULT 'active');
CREATE TABLE blog_posts (id SERIAL PRIMARY KEY, title TEXT, slug TEXT UNIQUE, content TEXT, status TEXT DEFAULT 'published');

ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

INSERT INTO products (name, slug, price) VALUES ('Test', 'test', 99.99);
INSERT INTO courses (title, slug, price) VALUES ('Test', 'test-curso', 199.99);
INSERT INTO blog_posts (title, slug, content) VALUES ('Test', 'test-blog', 'Contenido');
```

Luego recarga y verifica que funcione.

---

**¡IMPORTANTE!** Sin ejecutar el SQL en Supabase, NADA funcionará. Las tablas DEBEN existir primero.
