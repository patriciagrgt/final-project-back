import express from "express";
import axios from "axios";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";
import User from "../models/User.model.js";
import Curriculum from "../models/Curriculum.model.js";

const router = express.Router();

router.get("/seo-analysis", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;

    // Obtener información del usuario y su currículum
    const user = await User.findById(userId);
    const curriculum = await Curriculum.findOne({ userId });

    if (!user || !curriculum) {
      return res.status(404).json({ message: "User or curriculum not found" });
    }

    // Extraer los datos necesarios
    const { name, info, profession } = user;
    const { bio } = curriculum;

    // Construir el mensaje para la IA
    const prompt = `
      Analiza el siguiente perfil profesional y su currículum y sugiere mejoras SEO para hacerlo más visible en buscadores.
      **Perfil:** 
      - Nombre: ${name}
      - Profesión: ${profession || "No especificada"}
      - Información: ${info || "No proporcionada"}
      - Ubicación: ${location || "No especificada"}

      **Currículum:** 
      - Biografía: ${bio || "No proporcionada"}
      - Habilidades: ${skills?.join(", ") || "No especificadas"}
      - Experiencia: ${experience?.map(exp => `${exp.title} en ${exp.company}`).join(", ") || "No especificada"}
      - Educación: ${education?.map(edu => `${edu.degree} en ${edu.institution}`).join(", ") || "No especificada"}

      Responde con una lista de palabras clave y frases optimizadas que deberían agregarse para mejorar la visibilidad en buscadores.
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

    const suggestions = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se generaron sugerencias";

    res.json({ suggestions });

  } catch (error) {
    console.error("Error in SEO Analysis:", error);
    res.status(500).json({ message: "Error generating SEO suggestions" });
  }
});

export default router;
