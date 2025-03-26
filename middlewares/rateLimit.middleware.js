import rateLimit from "express-rate-limit";

const aiRequestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Máximo de 10 peticiones por IP
    message: { error: "Has alcanzado el límite de peticiones. Inténtalo más tarde." },
    standardHeaders: true,
    legacyHeaders: false,
});

export default aiRequestLimiter;
