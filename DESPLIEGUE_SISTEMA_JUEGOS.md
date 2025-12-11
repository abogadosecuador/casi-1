# Guía de Despliegue - Sistema de Juegos Profesional

## 🚀 Pasos para Desplegar en Producción

### Paso 1: Resolver Dependencias NPM

```bash
# Navegar al directorio del proyecto
cd c:\Users\Usuario\casi-1

# Instalar dependencias (resuelve conflicto react-helmet-async)
npm install

# Si hay conflictos de peer dependencies:
npm install --legacy-peer-deps

# Verificar que no hay errores
npm list
```

**Nota**: El conflicto de `react-helmet-async@2.0.5` ha sido resuelto usando `^1.3.0` que es compatible con React 18+.

### Paso 2: Configurar Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui

# Opcional: Configuración de PayPal/Stripe
VITE_PAYPAL_CLIENT_ID=tu-client-id
VITE_STRIPE_PUBLIC_KEY=tu-stripe-key
```

### Paso 3: Configurar Base de Datos Supabase

1. **Acceder a Supabase Dashboard**
   - Ir a: https://app.supabase.com
   - Seleccionar tu proyecto

2. **Ejecutar SQL Setup**
   - Ir a: SQL Editor
   - Crear nueva query
   - Copiar contenido de: `SETUP_GAMES_DATABASE.sql`
   - Ejecutar query

3. **Verificar Tablas Creadas**
   ```sql
   -- Verificar que todas las tablas existan
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

   Debe mostrar:
   - games
   - user_games
   - game_progress
   - user_tokens
   - token_transactions
   - user_achievements
   - user_profiles

### Paso 4: Verificar Permisos RLS

En Supabase Dashboard > Authentication > Policies:

Verificar que existan políticas para:
- ✅ user_games
- ✅ game_progress
- ✅ user_tokens
- ✅ token_transactions
- ✅ user_achievements
- ✅ user_profiles

### Paso 5: Compilar para Producción

```bash
# Build del proyecto
npm run build

# Verificar que no hay errores
npm run typecheck

# Preview local de la build
npm run preview
```

### Paso 6: Desplegar en Cloudflare Workers

```bash
# Desplegar a Cloudflare
npm run deploy

# O usar wrangler directamente
wrangler deploy
```

### Paso 7: Verificar Despliegue

1. **Acceder a la aplicación**
   - URL: https://tu-dominio.com/juegos

2. **Probar funcionalidades**
   - ✅ Cargar hub de juegos
   - ✅ Ver catálogo de juegos
   - ✅ Acceder a tienda de tokens
   - ✅ Ver estadísticas

3. **Verificar en consola del navegador**
   - No debe haber errores
   - Verificar que Supabase se conecta correctamente

## 📋 Checklist Pre-Despliegue

- [ ] Dependencias NPM instaladas sin errores
- [ ] Variables de entorno configuradas
- [ ] Base de datos Supabase configurada
- [ ] Tablas creadas y pobladas
- [ ] Políticas RLS habilitadas
- [ ] Build compila sin errores
- [ ] TypeScript sin errores
- [ ] Pruebas locales exitosas
- [ ] Dominio configurado
- [ ] SSL/HTTPS habilitado

## 🧪 Pruebas Funcionales

### Test 1: Cargar Hub de Juegos
```bash
# URL: http://localhost:5173/juegos
# Verificar:
- ✅ Se cargan 8 juegos
- ✅ Filtros funcionan
- ✅ Información de juegos visible
- ✅ Botones de compra activos
```

### Test 2: Comprar Juego
```bash
# Requisitos:
- Usuario autenticado
- Tokens disponibles (>= precio del juego)

# Pasos:
1. Hacer clic en "Comprar" en un juego
2. Verificar que tokens se restan
3. Verificar que juego aparece en "Mis Juegos"
4. Verificar que botón cambia a "Jugar Ahora"
```

### Test 3: Tienda de Tokens
```bash
# URL: http://localhost:5173/juegos/tienda
# Verificar:
- ✅ Se muestran 4 paquetes
- ✅ Precios correctos
- ✅ Bonificaciones visibles
- ✅ Botones de compra funcionales
```

### Test 4: Progreso de Juego
```bash
# Requisitos:
- Juego comprado

# Pasos:
1. Hacer clic en "Jugar Ahora"
2. Jugar y obtener puntuación
3. Terminar juego
4. Verificar que progreso se guarda
5. Verificar que tokens se actualizan
```

### Test 5: Estadísticas
```bash
# URL: http://localhost:5173/juegos/estadisticas
# Verificar:
- ✅ Tokens totales correctos
- ✅ Nivel actualizado
- ✅ Juegos completados contados
- ✅ Logros mostrados
```

## 🔍 Troubleshooting

### Error: "npm ERR! peer react@"^16.6.0 || ^17.0.0 || ^18.0.0""

**Solución**:
```bash
npm install --legacy-peer-deps
```

### Error: "VITE_SUPABASE_URL is not defined"

**Solución**:
1. Verificar archivo `.env.local` existe
2. Verificar que variables están correctas
3. Reiniciar servidor de desarrollo

### Error: "Cannot read property 'from' of undefined"

**Solución**:
- Verificar que Supabase está inicializado correctamente
- Verificar variables de entorno
- Verificar que usuario está autenticado

### Juegos no cargan

**Solución**:
1. Verificar que tabla `games` existe en Supabase
2. Verificar que datos están poblados
3. Verificar permisos RLS
4. Revisar consola del navegador para errores

### Tokens no se actualizan

**Solución**:
1. Verificar tabla `user_tokens` existe
2. Verificar que usuario tiene registro en tabla
3. Verificar políticas RLS
4. Revisar logs de Supabase

## 📊 Monitoreo en Producción

### Métricas a Monitorear

```bash
# Usar Supabase Dashboard para:
- Número de usuarios activos
- Transacciones de tokens
- Errores de base de datos
- Uso de API

# Usar Cloudflare Analytics para:
- Tráfico de sitio
- Errores HTTP
- Rendimiento de página
- Ubicación de usuarios
```

### Logs Importantes

```bash
# Supabase Logs
- Errores de RLS
- Fallos de conexión
- Transacciones fallidas

# Cloudflare Logs
- Errores 4xx/5xx
- Latencia de respuesta
- Uso de ancho de banda
```

## 🔐 Seguridad en Producción

### Verificaciones de Seguridad

- [ ] RLS habilitado en todas las tablas
- [ ] HTTPS/SSL configurado
- [ ] CORS configurado correctamente
- [ ] Validación de entrada en servidor
- [ ] Rate limiting habilitado
- [ ] Secrets no en código
- [ ] Backups automáticos configurados

### Mejores Prácticas

1. **Nunca** commit de `.env.local`
2. **Siempre** usar variables de entorno
3. **Validar** entrada de usuario
4. **Sanitizar** datos antes de guardar
5. **Usar** HTTPS en producción
6. **Monitorear** logs regularmente
7. **Hacer** backups frecuentes

## 📈 Escalabilidad

### Preparado para Crecer

El sistema está diseñado para escalar:
- Índices de base de datos optimizados
- Caché de datos implementado
- Lazy loading de componentes
- Compresión de assets
- CDN para assets estáticos

### Próximas Mejoras

1. Agregar más juegos
2. Implementar leaderboards
3. Sistema de amigos
4. Chat en tiempo real
5. Eventos y competiciones
6. Análisis de datos avanzado

## 📞 Soporte

Para problemas o preguntas:

1. **Revisar documentación**
   - `SISTEMA_JUEGOS_PROFESIONAL_GUIA.md`
   - `RESUMEN_SISTEMA_JUEGOS_COMPLETO.md`

2. **Revisar logs**
   - Supabase Dashboard
   - Cloudflare Analytics
   - Consola del navegador

3. **Contactar soporte**
   - Equipo de desarrollo
   - Supabase Support
   - Cloudflare Support

## ✅ Validación Final

Antes de considerar el despliegue completado:

```bash
# 1. Verificar instalación
npm list | grep -E "react|supabase"

# 2. Compilar sin errores
npm run build

# 3. No hay warnings de TypeScript
npm run typecheck

# 4. Pruebas locales exitosas
npm run dev
# Acceder a http://localhost:5173/juegos

# 5. Despliegue exitoso
npm run deploy
```

---

**Versión**: 1.0.0  
**Fecha**: Diciembre 2025  
**Estado**: ✅ Listo para Producción
