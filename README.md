![Logo de PatShare](assets/icon%2064%20x%2064.png)

# PatShare Backend

## 📋 Descripción
Este proyecto es la parte backend de una aplicación web full-stack desarrollada con Express/Node.js en el backend, utilizando MongoDB como base de datos y Google Gemini para funcionalidades de IA.

## 🏗️ Estructura del Proyecto
El proyecto backend está organizado en las siguientes carpetas principales:
- **⚙️ Servidor**: API REST con Express
- **🗃️ Modelos**: Esquemas de datos de MongoDB
- **🔐 Middlewares**: Funciones de autenticación y validación
- **🤖 Rutas de IA**: Procesamiento de inteligencia artificial

## 🛠️ Tecnologías Utilizadas
### Backend
- **📦 Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **🚂 Express**: Framework web para Node.js
- **🍃 MongoDB**: Base de datos NoSQL (a través de Mongoose)
- **🔐 JWT**: Autenticación basada en tokens
- **🔒 bcryptjs**: Encriptación de contraseñas
- **🔧 dotenv**: Gestión de variables de entorno
- **🤖 Google Gemini**: Integración de inteligencia artificial
- **💾 node-cache**: Caché de respuestas de IA

## 🌐 Modelos de Datos
- **User**: Modelo principal de usuario
- **Curriculum**: Perfil profesional
- **Project**: Proyectos del usuario
- **Contact**: Información de contacto

## ✨ Características
- 🔐 Autenticación de usuarios con JWT
- 🔒 Almacenamiento seguro de contraseñas con bcrypt
- 🌐 API RESTful
- 🤖 Procesamiento de inteligencia artificial
- 💾 Caché de respuestas de IA

## 🚀 Funcionalidades de IA
- **SEO Analysis**: Generación inteligente de palabras clave
- **Procesamiento backend** de solicitudes de IA
- **Caché inteligente** para respuestas de IA
  - Almacenamiento de respuestas por 1 hora
  - Reducción de llamadas redundantes a la API

## 🔧 Instalación

### Requisitos Previos
- Node.js (v18+)
- MongoDB
- Cuenta de Google Cloud (para API Gemini)

### Pasos de Instalación
1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/patshare-backend.git
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
- Crear archivo `.env`
- Añadir variables:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `GEMINI_API_KEY`

4. Iniciar el servidor
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## 🌍 Despliegue
- **Backend**: Compatible con plataformas como:
  - Heroku
  - Render
  - Railway
  - DigitalOcean

## 🔒 Seguridad
- Middlewares de autenticación
- Validación de datos
- Protección contra solicitudes no autorizadas
- Gestión segura de tokens JWT

## 🤝 Contribuciones
1. Hacer fork del repositorio
2. Crear rama de feature 
3. Commit de cambios
4. Push a la rama
5. Abrir Pull Request

## 👤 Autora
Desarrollado con ❤️ por Patricia

## 🔗 Enlaces
- 🌐 **Web en Producción (Netlify)**: [https://patshare.netlify.app/](https://patshare.netlify.app/)
- 📂 **Repositorio Backend (Render)**: [https://final-proyect-back.onrender.com](https://final-proyect-back.onrender.com)

¡Gracias por visitar PatShare! 🫶