import express from "express";
import Project from "../models/Project.model.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Create Project
router.post("/", isAuthenticated, (req, res, next) => {
  Project.create({
    userId: req.payload._id, // Se usa el ID del usuario autenticado
    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies,
    link: req.body.link,
    images: req.body.images,
  })
    .then((createdProject) => {
      console.log("Project created ->", createdProject);
      res.status(201).json(createdProject);
    })
    .catch((error) => {
      console.error("Error while creating Project ->", error.message);
      next(error);
    });
});

// Obtener proyectos por userId
router.get("/user/:userId", (req, res, next) => {
  Project.find({ userId: req.params.userId })
    .then(projects => res.json(projects))
    .catch(error => {
      console.error("Error while fetching Projects ->", error.message);
      next(error);
    });
});

// Actualizar proyecto por ID
router.put("/:id", isAuthenticated, (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedProject => {
      if (!updatedProject) return res.status(404).json({ message: "Project not found" });
      res.json(updatedProject);
    })
    .catch(error => {
      console.error("Error while updating Project ->", error.message);
      next(error);
    });
});


// Eliminar proyecto por ID
router.delete("/:id", isAuthenticated, (req, res, next) => {
  Project.findByIdAndDelete(req.params.id)
    .then(deletedProject => {
      if (!deletedProject) return res.status(404).json({ message: "Project not found" });
      res.json({ message: "Project deleted successfully" });
    })
    .catch(error => {
      console.error("Error while deleting Project ->", error.message);
      next(error);
    });
});

export default router;
