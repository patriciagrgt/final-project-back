import express from "express";
import Project from "../models/Project.model.js";

const router = express.Router();

// Create Project
router.post("/", (req, res, next) => {
  Project.create({
    userId: req.body.userId,
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

// Get all Projects 
router.get("/", (req, res, next) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((error) => {
      console.error("Error while fetching Projects ->", error.message);
      next(error);
    });
});

// Obtener todos los proyectos de un usuario
router.get("/user/:userId", (req, res, next) => {
  Project.find({ userId: req.params.userId })
    .then((projects) => res.json(projects))
    .catch((error) => next(error));
});

// Actualizar un proyecto por su ID
router.put("/:id", (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedProject) => {
      if (!updatedProject) return res.status(404).json({ message: "Project not found" });
      res.json(updatedProject);
    })
    .catch((error) => next(error));
});

// Eliminar un proyecto por su ID
router.delete("/:id", (req, res, next) => {
  Project.findByIdAndDelete(req.params.id)
    .then((deletedProject) => {
      if (!deletedProject) return res.status(404).json({ message: "Project not found" });
      res.json({ message: "Project deleted successfully" });
    })
    .catch((error) => next(error));
});

export default router;
