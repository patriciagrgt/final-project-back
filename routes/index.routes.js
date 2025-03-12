import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import CurriculumRoutes from "./curriculum.routes.js";
import ProjectRoutes from "./project.routes.js";
import ContactRoutes from "./contact.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API. Use the available endpoints." });
});

// Todas las rutas están aquí
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/curriculum", CurriculumRoutes);
router.use("/projects", ProjectRoutes);
router.use("/contact", ContactRoutes);

export default router;