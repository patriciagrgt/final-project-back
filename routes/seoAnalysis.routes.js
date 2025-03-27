import express from "express";
import axios from "axios";
import NodeCache from "node-cache"; // Nueva importación
import { isAuthenticated } from "../middlewares/jwt.middleware.js";
import aiRequestLimiter from "../middlewares/rateLimit.middleware.js";
import validateAI from "../middlewares/validateAI.js";
import User from "../models/User.model.js";
import Curriculum from "../models/Curriculum.model.js";

const router = express.Router();

// Configuración de caché
const seoCache = new NodeCache({ stdTTL: 3600 }); // Caché por 1 hora

router.post("/seo-analysis", isAuthenticated, aiRequestLimiter, validateAI, async (req, res) => {
  try {
    const userId = req.payload._id;

    // Crear una clave de caché única para este usuario
    const cacheKey = `seo-analysis-${userId}`;

    // Verificar si hay respuesta en caché
    const cachedResponse = seoCache.get(cacheKey);
    if (cachedResponse) {
      console.log("Devolviendo respuesta en caché");
      return res.json(cachedResponse);
    }

    // Obtener información del usuario y su currículum
    const user = await User.findById(userId).select('name profession info');
    const curriculum = await Curriculum.findOne({ userId }).select('bio');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Construir el mensaje para la IA usando los datos recuperados
    const prompt = `
      Genera una lista estratégica de 15 palabras clave optimizadas para SEO profesional, considerando:

      PERFIL PROFESIONAL:
      - Nombre: ${user.name}
      - Profesión: ${user.profession || "No especificada"}
      - Información adicional: ${user.info || "No proporcionada"}

      CURRÍCULUM:
      - Biografía profesional: ${curriculum?.bio || "No proporcionada"}

      INSTRUCCIONES ESPECÍFICAS:
      1. Selecciona palabras clave que:
        - Sean relevantes para la industria de ${user.profession}
        - Tengan alto volumen de búsqueda
        - Representen habilidades y competencias
        - Sean específicas pero no demasiado técnicas

      2. Formato de salida:
        - 10 palabras clave separadas por comas
        - Prioriza términos en español e inglés
        - Incluye variaciones profesionales

      3. Categorías a considerar:
        - Habilidades técnicas
        - Certificaciones
        - Metodologías
        - Herramientas profesionales
        - Soft skills relevantes

      EJEMPLO DE FORMATO DE RESPUESTA:
      "gestión de proyectos, project management, liderazgo, scrum, transformación digital, agile methodology, análisis de datos, innovación, strategic planning, team leadership"
    `;

    // Llamar a la API de Google Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Verifica la respuesta de Gemini en la terminal
    console.log("Contenido completo de Gemini:", JSON.stringify(response.data.candidates[0], null, 2));

    // Asegura que accedes correctamente a las sugerencias
    const suggestions = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No se generaron sugerencias";

    // Crear objeto de respuesta para caché y envío
    const responseToCache = { suggestions };

    // Guardar en caché
    seoCache.set(cacheKey, responseToCache);

    res.json(responseToCache);

  } catch (error) {
    console.error("Error in SEO Analysis:", error);
    res.status(500).json({ message: "Error generating SEO suggestions" });
  }
});

export default router;