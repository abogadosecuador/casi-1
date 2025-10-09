# 📦 INSTALACIÓN DE NODE.JS

## ⚠️ PROBLEMA DETECTADO
Node.js no está instalado o no está en el PATH del sistema.

---

## 🔧 SOLUCIÓN RÁPIDA

### **Opción 1: Instalación con winget (Recomendado)**
```powershell
# Abrir PowerShell como Administrador y ejecutar:
winget install OpenJS.NodeJS.LTS
```

### **Opción 2: Descarga Manual**
1. Ir a: https://nodejs.org/
2. Descargar la versión **LTS** (Long Term Support)
3. Ejecutar el instalador
4. **IMPORTANTE:** Marcar la casilla "Add to PATH"
5. Reiniciar la terminal/PowerShell

### **Opción 3: Verificar instalación existente**
```powershell
# Buscar Node.js en el sistema
Get-ChildItem -Path "C:\Program Files\" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue
Get-ChildItem -Path "C:\Program Files (x86)\" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue
```

---

## ✅ VERIFICAR INSTALACIÓN

Después de instalar, **reiniciar PowerShell** y ejecutar:

```powershell
# Verificar Node.js
node --version
# Debe mostrar: v20.x.x o similar

# Verificar npm
npm --version
# Debe mostrar: 10.x.x o similar
```

---

## 🚀 SIGUIENTE PASO

Una vez que Node.js esté instalado y verificado:

```powershell
# Volver al directorio del proyecto
cd C:\Users\Usuario\casi

# Ejecutar el sistema
.\INICIAR_SISTEMA.bat
```

---

## 🔍 ALTERNATIVA: Usar CMD en lugar de PowerShell

Si PowerShell da problemas, usar **CMD (Símbolo del sistema)**:

1. Presionar `Win + R`
2. Escribir: `cmd`
3. Navegar al proyecto:
   ```cmd
   cd C:\Users\Usuario\casi
   ```
4. Ejecutar:
   ```cmd
   INICIAR_SISTEMA.bat
   ```

---

## 📋 RESUMEN DE CONFIGURACIÓN

### **Lo que se ha configurado:**
- ✅ Vite con proxy automático (puerto 5173)
- ✅ Backend interno (puerto 3001)
- ✅ API service usando rutas relativas
- ✅ Script de inicio automatizado
- ✅ Configuración de un solo puerto público

### **Lo que falta:**
- ⚠️ Instalar Node.js
- ⚠️ Agregar Node.js al PATH del sistema

---

## 💡 CONSEJO

Si ya tienes Node.js instalado pero no aparece en el PATH:

1. **Agregar al PATH manualmente:**
   - Ir a: Panel de Control → Sistema → Configuración avanzada del sistema
   - Variables de entorno
   - En "Variables del sistema", editar "Path"
   - Agregar la ruta de Node.js (por ejemplo: `C:\Program Files\nodejs\`)
   - Reiniciar la terminal

2. **Verificar la ruta:**
   ```powershell
   $env:Path -split ';' | Select-String nodejs
   ```

---

**Una vez instalado Node.js, el sistema funcionará perfectamente en localhost:5173** ✅
