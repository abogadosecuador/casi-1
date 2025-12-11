# 🚀 Guía de Usuario Final - Plataforma Integrada Profesional

## ¿Qué es esta plataforma?

Una plataforma profesional integrada que combina 3 sistemas potentes:

1. **Abogados OS** - Sistema operativo para gestión legal profesional
2. **Wilex Game Station** - Plataforma de entretenimiento con juegos
3. **WI Global Banking & Crypto** - Plataforma de finanzas digitales y trading

## 🎯 Cómo Iniciar (Muy Fácil)

### Opción 1: Ejecutar Script Automático (Recomendado)

1. Abre la carpeta: `C:\Users\Usuario\casi-1`
2. Busca el archivo: **`INICIAR_SISTEMA_USUARIO_FINAL.bat`**
3. **Haz doble clic** para ejecutar
4. ¡Listo! El sistema se iniciará automáticamente

El script hará todo por ti:
- ✓ Verificará Node.js (lo instalará si no lo tienes)
- ✓ Instalará todas las dependencias
- ✓ Iniciará el servidor de desarrollo
- ✓ Abrirá la aplicación en tu navegador

### Opción 2: Iniciar Manualmente (Si prefieres)

```bash
# Abre CMD o PowerShell en la carpeta del proyecto
cd C:\Users\Usuario\casi-1

# Instala dependencias (solo la primera vez)
npm install

# Inicia el servidor
npm run dev
```

## 🌐 Acceder a la Plataforma

Una vez que el servidor esté corriendo, abre tu navegador en:

```
http://localhost:5173
```

## 📋 Funcionalidades Principales

### 1. Registro de Usuarios
- Ve a `/register`
- Completa el formulario con:
  - Nombre completo
  - Email válido
  - Contraseña (mínimo 8 caracteres)
- ¡Listo! Tu cuenta está creada

### 2. Inicio de Sesión
- Ve a `/login`
- Ingresa tu email y contraseña
- Accede a tu dashboard personal

### 3. Sistemas Integrados

#### Abogados OS (`/abogados-os`)
- Sistema operativo profesional
- Gestión de casos legales
- Calendario integrado
- Explorador de archivos
- Navegador web

#### Wilex Game Station (`/games`)
- Plataforma de juegos retro
- Intro cinematográfica
- Sistema de puntuación
- Logros y desafíos

#### WI Global Banking & Crypto (`/crypto-banking`)
- Wallet de criptomonedas
- Trading en tiempo real
- Dashboard de finanzas
- Múltiples temas personalizables

### 4. Hub de Proyectos (`/proyectos`)
- Página central para acceder a todos los sistemas
- Información de cada plataforma
- Acceso rápido a funcionalidades

## 💳 Sistema de Compras

- Integración con **PayPal**
- Compra de créditos y tokens
- Transacciones seguras
- Historial de compras en tu perfil

## 🎨 Diseño y Experiencia

- **Interfaz Profesional**: Diseño moderno y limpio
- **Responsivo**: Funciona en desktop, tablet y móvil
- **Temas Personalizables**: Elige entre múltiples temas
- **Animaciones Suaves**: Experiencia visual fluida
- **Accesibilidad**: Diseñado para todos

## 🔐 Seguridad

- Autenticación segura con Supabase
- Contraseñas encriptadas
- Sincronización segura entre módulos
- Datos protegidos

## ⚙️ Requisitos del Sistema

- **Windows 10 o superior**
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)
- **Conexión a Internet** (para algunas funcionalidades)
- **Node.js** (se instalará automáticamente si no lo tienes)

## 🆘 Solución de Problemas

### "Node.js no está instalado"
- El script intentará instalarlo automáticamente
- Si falla, descarga desde: https://nodejs.org/

### "Puerto 5173 ya está en uso"
- Cierra otras aplicaciones que usen ese puerto
- O ejecuta: `npm run dev -- --port 3000`

### "Error al instalar dependencias"
- Elimina la carpeta `node_modules`
- Ejecuta: `npm install --legacy-peer-deps`

### "No puedo acceder a localhost:5173"
- Verifica que el servidor esté corriendo (deberías ver el mensaje en la consola)
- Intenta en otro navegador
- Reinicia el servidor

## 📞 Contacto y Soporte

- **Email**: contacto@plataforma.com
- **Documentación**: Ver archivos .md en la carpeta raíz
- **Problemas**: Revisa los logs en la consola

## 🎓 Primeros Pasos Recomendados

1. **Ejecuta el script** `INICIAR_SISTEMA_USUARIO_FINAL.bat`
2. **Espera a que abra** http://localhost:5173
3. **Crea una cuenta** en `/register`
4. **Inicia sesión** en `/login`
5. **Explora los sistemas** desde el hub de proyectos
6. **Personaliza tu perfil** en el dashboard

## 📊 Estadísticas de la Plataforma

- **3 Sistemas Integrados**
- **12+ Juegos Disponibles**
- **Múltiples Temas Personalizables**
- **Sistema de Compras Integrado**
- **Autenticación Centralizada**
- **Sincronización en Tiempo Real**

## ✨ Características Destacadas

✓ Registro y login sin complicaciones
✓ Sincronización automática entre módulos
✓ Diseño profesional y moderno
✓ Sistema de compras seguro
✓ Múltiples idiomas (español, inglés)
✓ Temas oscuro y claro
✓ Responsive en todos los dispositivos
✓ Sin errores ni problemas de carga

---

**¡Disfruta de la plataforma!** 🎉

Para más información, consulta la documentación técnica en la carpeta del proyecto.
