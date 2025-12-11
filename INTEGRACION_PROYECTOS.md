# Integración Profesional de 3 Proyectos

## Estructura de Integración

### Módulos Integrados en `/src/modules/`

1. **Abogados OS** (`/src/modules/abogados-os/`)
   - Sistema operativo profesional para abogados
   - Componentes: Login, Window, Apps, Explorer, Browser, Legal Web
   - Acceso: `/abogados-os`

2. **Wilex Game Station** (`/src/modules/games/`)
   - Plataforma de juegos retro con intro cinematográfica
   - Componentes: Scenes, GameHub, PlayerContext
   - Acceso: `/games`

3. **WI Global Banking & Crypto** (`/src/modules/crypto-banking/`)
   - Plataforma profesional de trading y finanzas
   - Componentes: Dashboard, Exchange, Wallet, Auth, Settings
   - Acceso: `/crypto-banking`

## Sistema de Autenticación Unificado

- **Sincronización de Usuario**: El usuario autenticado en el proyecto principal se sincroniza automáticamente con todos los módulos
- **LocalStorage Bridge**: Los datos del usuario se guardan en:
  - `wi_user` (para módulo de crypto banking)
  - `nexuspro_user` (para compatibilidad)
  - `abogados_user` (para módulo de abogados)

## Rutas Disponibles

```
/abogados-os      - Sistema operativo de abogados
/games            - Plataforma de juegos
/crypto-banking   - Plataforma de trading y finanzas
/proyectos        - Hub de proyectos integrados
/dashboard        - Dashboard principal
/login            - Página de login
/register         - Página de registro
```

## Funcionalidades Integradas

✅ Registro de usuarios
✅ Login/Logout
✅ Sincronización de autenticación entre módulos
✅ Sistema de compras (PayPal integrado)
✅ Gestión de créditos y tokens
✅ Temas personalizables
✅ Soporte multiidioma

## Dependencias Consolidadas

- React 19.2.0
- React Router DOM 6.20.1
- Framer Motion 12.23.25
- Lucide React 0.555.0
- Recharts 3.5.1
- Google GenAI 1.30.0
- Supabase JS 2.39.0
- Y más...

## Notas de Implementación

- Los módulos se cargan de forma lazy para optimizar performance
- Cada módulo mantiene su propia lógica interna
- La autenticación se sincroniza automáticamente
- No hay duplicación de código
- Todos los módulos comparten las mismas dependencias
