import dotenv from "dotenv";
dotenv.config();

import "./db/index.js"; // Conexión a la base de datos
import express from "express";
const app = express();

import config from "./config/index.js"; // Configuración de middlewares
config(app);

// Rutas
import indexRoutes from "./routes/index.routes.js";
app.use("/api", indexRoutes);

// Middlewares de manejo de errores
import { errorHandler, notFoundHandler } from './middlewares/error-handling.js';

// Manejador de rutas no encontradas (debe ir antes del manejador de errores)
notFoundHandler(app);

// Manejador de errores (debe ir al final)
errorHandler(app);

export default app;