# Sistema de Juegos Profesional - Guía Completa

## 📋 Descripción General

Sistema integrado de juegos profesionales para plataforma de servicios legales con:
- **8+ Juegos** variados (legal, arcade, puzzle, estrategia)
- **Sistema de Tokens** para compras y recompensas
- **Persistencia de Datos** en Supabase
- **Diseño Cristal** moderno y profesional
- **Controles Multi-dispositivo** (PC, móvil, gamepad)
- **Logros y Recompensas** desbloqueables

## 🚀 Instalación y Configuración

### 1. Resolver Dependencias NPM

El proyecto usa `react-helmet-async@^1.3.0` que es compatible con React 18+.

```bash
# Instalar dependencias
npm install

# Si hay conflictos, usar:
npm install --legacy-peer-deps
```

### 2. Configurar Base de Datos Supabase

Ejecutar el archivo SQL en Supabase:

```sql
-- Copiar contenido de: SETUP_GAMES_DATABASE.sql
-- Ejecutar en: Supabase Dashboard > SQL Editor
```

Esto crea:
- Tabla `games` - Catálogo de juegos
- Tabla `user_games` - Juegos comprados por usuario
- Tabla `game_progress` - Progreso en cada juego
- Tabla `user_tokens` - Balance de tokens
- Tabla `token_transactions` - Historial de transacciones
- Tabla `user_achievements` - Logros desbloqueados
- Tabla `user_profiles` - Perfiles de usuario

### 3. Variables de Entorno

Crear archivo `.env.local`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
```

## 🎮 Componentes Principales

### GamesHubProfessional
- **Ubicación**: `src/components/GamesHubProfessional.tsx`
- **Descripción**: Hub central con catálogo de juegos
- **Características**:
  - Filtrado por categoría
  - Sistema de compra de juegos
  - Visualización de recompensas
  - Diseño cristal profesional

### GameStoreIntegrado
- **Ubicación**: `src/components/GameStoreIntegrado.tsx`
- **Descripción**: Tienda para comprar tokens
- **Características**:
  - 4 paquetes de tokens
  - Bonificaciones por volumen
  - Historial de transacciones
  - Interfaz intuitiva

### GamePlayerMultiDevice
- **Ubicación**: `src/components/GamePlayerMultiDevice.tsx`
- **Descripción**: Reproductor de juegos con soporte multi-dispositivo
- **Características**:
  - Detección automática de dispositivo
  - Controles teclado/móvil/gamepad
  - Contador de tiempo y puntuación
  - Juegos individuales integrados

### GamesIntegrationPage
- **Ubicación**: `src/pages/GamesIntegrationPage.tsx`
- **Descripción**: Página principal de integración
- **Características**:
  - Navegación entre vistas
  - Estadísticas del usuario
  - Información de sistema

## 📊 Servicio de Progreso

**Ubicación**: `src/services/gameProgressService.ts`

Métodos disponibles:

```typescript
// Guardar progreso de juego
await GameProgressService.guardarProgreso(userId, gameId, nivel, puntuacion, tiempoJugado, logros);

// Obtener progreso específico
const progreso = await GameProgressService.obtenerProgreso(userId, gameId);

// Agregar tokens
const nuevoBalance = await GameProgressService.agregarTokens(userId, cantidad, razon);

// Agregar XP
const nuevoNivel = await GameProgressService.agregarXP(userId, cantidad);

// Desbloquear logro
await GameProgressService.desbloquearLogro(userId, gameId, logroId);

// Obtener estadísticas
const stats = await GameProgressService.obtenerEstadisticas(userId);

// Comprar juego
await GameProgressService.comprarJuego(userId, gameId, precioTokens);

// Verificar propiedad
const esPropiedad = await GameProgressService.verificarPropiedad(userId, gameId);
```

## 🎯 Juegos Disponibles

### 1. Juicio Legal ⚖️
- **Categoría**: Legal
- **Dificultad**: Media
- **Precio**: 50 tokens
- **Recompensa**: 50 tokens + 100 XP
- **Descripción**: Resuelve casos legales complejos

### 2. Defensor del Espacio 🚀
- **Categoría**: Arcade
- **Dificultad**: Media
- **Precio**: 40 tokens
- **Recompensa**: 40 tokens + 80 XP
- **Descripción**: Arcade de acción con niveles progresivos

### 3. Tetris Legal 🧩
- **Categoría**: Puzzle
- **Dificultad**: Fácil
- **Precio**: 35 tokens
- **Recompensa**: 35 tokens + 70 XP
- **Descripción**: Puzzle con términos legales

### 4. ¿Quién Quiere Ser Abogado? 🎓
- **Categoría**: Legal
- **Dificultad**: Media
- **Precio**: 45 tokens
- **Recompensa**: 45 tokens + 90 XP
- **Descripción**: Trivia legal con preguntas progresivas

### 5. Constructor de Contratos 📋
- **Categoría**: Estrategia
- **Dificultad**: Difícil
- **Precio**: 60 tokens
- **Recompensa**: 60 tokens + 120 XP
- **Descripción**: Construye contratos legales válidos

### 6. Memoria Legal 🧠
- **Categoría**: Puzzle
- **Dificultad**: Fácil
- **Precio**: 30 tokens
- **Recompensa**: 30 tokens + 60 XP
- **Descripción**: Juego de memoria con conceptos legales

### 7. Ajedrez Legal ♟️
- **Categoría**: Estrategia
- **Dificultad**: Difícil
- **Precio**: 65 tokens
- **Recompensa**: 65 tokens + 130 XP
- **Descripción**: Ajedrez estratégico con contexto legal

### 8. Damas Legales ⚫
- **Categoría**: Estrategia
- **Dificultad**: Media
- **Precio**: 50 tokens
- **Recompensa**: 50 tokens + 100 XP
- **Descripción**: Damas clásicas con mecánicas legales

## 🏆 Logros Disponibles

- **Primera Victoria** - Gana tu primer juego (10 tokens)
- **Maestro Legal** - Completa todos los juegos legales (50 tokens)
- **Campeón Arcade** - Alcanza puntuación máxima en arcade (50 tokens)
- **Puntuación Perfecta** - Obtén puntuación perfecta (100 tokens)
- **Corredor Rápido** - Completa un juego en tiempo récord (75 tokens)
- **Maestro de Todos** - Completa todos los juegos (200 tokens)

## 💎 Sistema de Tokens

### Paquetes Disponibles

| Paquete | Tokens | Precio | Descuento | Bonus | Popular |
|---------|--------|--------|-----------|-------|---------|
| Básico | 100 | $4.99 | 0% | 0 | ❌ |
| Intermedio | 500 | $19.99 | 8% | 50 | ✅ |
| Premium | 1000 | $34.99 | 15% | 150 | ❌ |
| Elite | 2500 | $74.99 | 25% | 500 | ❌ |

### Usos de Tokens

- Comprar juegos
- Desbloquear mejoras
- Acceder a contenido premium
- Recompensas por logros

## 🔐 Seguridad y RLS

Todas las tablas tienen políticas RLS (Row Level Security) habilitadas:
- Los usuarios solo ven sus propios datos
- Las transacciones se registran automáticamente
- Los tokens se validan antes de cada compra

## 📱 Responsividad

El sistema está optimizado para:
- **PC**: Controles con teclado y ratón
- **Móvil**: Botones táctiles y gestos
- **Gamepad**: Soporte para controles de juego

## 🚀 Ejecutar el Proyecto

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 📍 Rutas Disponibles

- `/juegos` - Centro de juegos principal
- `/juegos/hub` - Hub de juegos
- `/juegos/tienda` - Tienda de tokens

## 🔧 Troubleshooting

### Error: "Could not resolve dependency"
**Solución**: Usar `npm install --legacy-peer-deps`

### Error: "SUPABASE_URL is required"
**Solución**: Verificar variables de entorno en `.env.local`

### Juegos no cargan
**Solución**: Verificar que las tablas de base de datos estén creadas

### Tokens no se actualizan
**Solución**: Verificar permisos RLS en Supabase

## 📞 Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2025  
**Estado**: ✅ Producción
