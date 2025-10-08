# 📦 INSTALAR NODE.JS PARA LOCALHOST

## ⚠️ PROBLEMA DETECTADO

Node.js no está instalado o no está en el PATH del sistema.

---

## 🔧 SOLUCIÓN: Instalar Node.js

### Opción 1: Instalador Oficial (Recomendado)

1. **Descargar Node.js**
   - Ir a: https://nodejs.org/
   - Descargar versión **LTS** (Long Term Support)
   - Recomendado: v18.x o v20.x

2. **Ejecutar instalador**
   - Doble click en el archivo `.msi` descargado
   - Click en "Next" en todas las opciones
   - **IMPORTANTE:** Marcar la opción "Automatically install the necessary tools"
   - Click en "Install"

3. **Verificar instalación**
   - Abrir PowerShell NUEVA ventana
   - Ejecutar:
   ```powershell
   node --version
   npm --version
   ```

### Opción 2: Usando Chocolatey

Si tienes Chocolatey instalado:

```powershell
# Ejecutar como Administrador
choco install nodejs-lts -y
```

### Opción 3: Usando winget

Si tienes winget (Windows 11):

```powershell
winget install OpenJS.NodeJS.LTS
```

---

## ✅ VERIFICAR INSTALACIÓN

Después de instalar, **CIERRA Y ABRE UNA NUEVA terminal** PowerShell y ejecuta:

```powershell
node --version
# Debe mostrar: v18.x.x o superior

npm --version  
# Debe mostrar: 9.x.x o superior
```

---

## 🚀 SIGUIENTE PASO

Una vez Node.js instalado:

1. **Instalar dependencias**
   ```powershell
   npm install
   ```

2. **Verificar que todo esté OK**
   ```powershell
   .\check-localhost.ps1
   ```

3. **Iniciar servidor**
   ```powershell
   npm run dev
   ```

---

## 🐛 PROBLEMAS COMUNES

### "node" no se reconoce después de instalar

**Solución:** Reiniciar la terminal

1. Cerrar PowerShell completamente
2. Abrir PowerShell NUEVA ventana
3. Probar: `node --version`

### PATH no actualizado

**Solución Manual:**

1. Buscar "Variables de entorno" en Windows
2. Variables del sistema → Path → Editar
3. Agregar: `C:\Program Files\nodejs\`
4. Reiniciar terminal

### Versión antigua instalada

**Solución:** Desinstalar versión vieja

1. Panel de Control → Programas → Desinstalar
2. Buscar "Node.js"
3. Desinstalar
4. Instalar versión nueva desde nodejs.org

---

## 📋 CHECKLIST POST-INSTALACIÓN

Después de instalar Node.js:

- [ ] `node --version` funciona
- [ ] `npm --version` funciona
- [ ] `npm install` completa exitosamente
- [ ] `npm run dev` inicia el servidor

---

## 🔗 RECURSOS

- **Node.js Official:** https://nodejs.org/
- **npm Documentation:** https://docs.npmjs.com/
- **Node.js Windows Guide:** https://nodejs.dev/learn/how-to-install-nodejs

---

## ⏭️ DESPUÉS DE INSTALAR

```powershell
# 1. Instalar dependencias
npm install

# 2. Verificar
.\check-localhost.ps1

# 3. Iniciar servidor
npm run dev
```

**La aplicación se abrirá en:** http://localhost:3000

---

## 💡 ALTERNATIVA: Usar Node.js Portable

Si no puedes instalar Node.js globalmente:

1. Descargar Node.js portable
2. Extraer en una carpeta
3. Agregar al PATH temporalmente:
   ```powershell
   $env:Path += ";C:\ruta\a\node"
   ```
4. Ejecutar `npm install` y `npm run dev`

---

**Una vez Node.js instalado, tu plataforma estará 100% lista para localhost!** 🚀
