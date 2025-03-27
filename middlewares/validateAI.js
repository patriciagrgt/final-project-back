import { body, validationResult } from "express-validator";

const validateAI = [
  body("input")
  .optional()
  .trim()
  .notEmpty().withMessage("El contenido no puede estar vacío.")
  .isLength({ min: 10 }).withMessage("El texto debe tener al menos 10 caracteres.")
  .matches(/^[a-zA-Z0-9\s.,!?ÁÉÍÓÚáéíóúñÑ]+$/).withMessage("El contenido contiene caracteres no permitidos."),

(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Si no hay input, simplemente continúa
  if (!req.body.input) {
    return next();
  }

    // Lista ampliada de palabras prohibidas
    const prohibitedWords = [
      "odio", "violencia", "racismo", "insulto", "amenaza",
      "terrorismo", "discriminación", "acoso", "drogas", "suicidio",
      "asesinato", "pornografía", "fraude", "extorsión", "difamación"
    ];

    const userInput = req.body.input.toLowerCase();

    if (prohibitedWords.some(word => userInput.includes(word))) {
      return res.status(400).json({ error: "El contenido contiene términos no permitidos." });
    }

    // Evita contenido potencialmente sesgado
    const biasIndicators = [
      "hombre mejor que mujer", "raza superior", "discriminación positiva",
      "género débil", "odio religioso"
    ];

    if (biasIndicators.some(phrase => userInput.includes(phrase))) {
      return res.status(400).json({ error: "El contenido puede contener sesgos inaceptables." });
    }

    next();
  },
];

export default validateAI;