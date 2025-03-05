import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import projectRoutes from "./project.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API. Use the available endpoints." });
});

// Todas las rutas están aquí
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/profiles", profileRoutes);
router.use("/projects", projectRoutes);

export default router;