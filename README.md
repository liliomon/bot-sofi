# 🤖 Bot de Votación Automática para Sofia Pepper

Bot automatizado que vota por "Sofia Pepper, Amarillo High girls soccer" en https://poll.fm/15690408

## 📋 Requisitos Previos

### 1. Instalar Node.js

#### Windows:
1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador `.msi` descargado
4. Sigue las instrucciones del instalador
5. Reinicia tu computadora
6. Verifica la instalación abriendo CMD y ejecutando:
   ```cmd
   node --version
   npm --version
   ```

#### macOS:
1. **Opción 1 - Instalador oficial:**
   - Ve a https://nodejs.org/
   - Descarga la versión LTS
   - Ejecuta el archivo `.pkg` descargado
   - Sigue las instrucciones del instalador

2. **Opción 2 - Homebrew (recomendado):**
   ```bash
   # Instalar Homebrew si no lo tienes
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Instalar Node.js
   brew install node
   ```

3. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian):
```bash
# Actualizar el sistema
sudo apt update

# Instalar Node.js y npm
sudo apt install nodejs npm

# Verificar instalación
node --version
npm --version
```

#### Linux (CentOS/RHEL/Fedora):
```bash
# Para CentOS/RHEL
sudo yum install nodejs npm

# Para Fedora
sudo dnf install nodejs npm

# Verificar instalación
node --version
npm --version
```

### 2. Instalar Git

#### Windows:
1. Ve a https://git-scm.com/download/win
2. Descarga Git para Windows
3. Ejecuta el instalador
4. Acepta todas las configuraciones por defecto
5. Verifica la instalación abriendo CMD:
   ```cmd
   git --version
   ```

#### macOS:
1. **Opción 1 - Xcode Command Line Tools:**
   ```bash
   xcode-select --install
   ```

2. **Opción 2 - Homebrew:**
   ```bash
   brew install git
   ```

3. Verifica la instalación:
   ```bash
   git --version
   ```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install git
git --version
```

#### Linux (CentOS/RHEL/Fedora):
```bash
# Para CentOS/RHEL
sudo yum install git

# Para Fedora
sudo dnf install git

git --version
```

## 🚀 Instalación y Uso

### 1. Clonar el Repositorio

Abre la terminal/CMD y ejecuta:

```bash
git clone [URL_DEL_REPOSITORIO]
cd bot
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar el Bot

```bash
node voting-bot.js
```

## 📱 Cómo Abrir la Terminal

### Windows:
- **Opción 1:** Presiona `Win + R`, escribe `cmd` y presiona Enter
- **Opción 2:** Presiona `Win + X` y selecciona "Símbolo del sistema" o "PowerShell"
- **Opción 3:** Busca "cmd" o "PowerShell" en el menú de inicio

### macOS:
- **Opción 1:** Presiona `Cmd + Espacio`, escribe "Terminal" y presiona Enter
- **Opción 2:** Ve a Aplicaciones > Utilidades > Terminal
- **Opción 3:** Presiona `Cmd + T` si ya tienes Terminal abierto

### Linux:
- **Opción 1:** Presiona `Ctrl + Alt + T`
- **Opción 2:** Busca "Terminal" en el menú de aplicaciones
- **Opción 3:** Clic derecho en el escritorio y selecciona "Abrir Terminal"

## ⚙️ Configuración del Bot

El bot está configurado para:
- ✅ Votar por "Sofia Pepper, Amarillo High girls soccer"
- 🎯 Objetivo: 10,000 votos
- ⚡ Optimizado para máxima velocidad
- 📊 Muestra estadísticas en tiempo real

## 📊 Información Durante la Ejecución

El bot mostrará:
- Número de intento actual
- Progreso de votos (ej: 150/10,000)
- Tiempo transcurrido
- Tasa de éxito
- Velocidad de votación

## 🛠️ Solución de Problemas

### Error: "node no se reconoce como comando"
- Reinicia tu computadora después de instalar Node.js
- Verifica que Node.js esté en tu PATH

### Error: "git no se reconoce como comando"
- Reinicia tu computadora después de instalar Git
- Verifica que Git esté en tu PATH

### Error de permisos en Linux/macOS:
```bash
sudo npm install
```

### El bot no encuentra elementos:
- Verifica que la página del poll esté disponible
- El bot incluye múltiples métodos de búsqueda como respaldo

## 📞 Soporte

Si encuentras algún problema:
1. Verifica que Node.js y Git estén instalados correctamente
2. Asegúrate de estar en el directorio correcto del proyecto
3. Verifica tu conexión a internet
4. Reinicia la terminal y vuelve a intentar

## ⚠️ Nota Importante

Este bot está diseñado específicamente para votar por Sofia Pepper en el poll de Amarillo Globe-News. Úsalo de manera responsable y respeta los términos de servicio del sitio web.
