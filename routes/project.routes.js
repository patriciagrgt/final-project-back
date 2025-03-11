import express from "express";
import Project from "../models/Project.model.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Create Project (Protected)
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

// Get All Projects by User ID (Protected)
router.get("/user/:userId", (req, res, next) => {
  Project.find({ userId: req.params.userId })
    .then(projects => res.json(projects))
    .catch(error => {
      console.error("Error while fetching Projects ->", error.message);
      next(error);
    });
});

// Get Single Project (Protected)
router.get("/:id", isAuthenticated, (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    })
    .catch(error => {
      console.error("Error while fetching Project ->", error.message);
      next(error);
    });
});

// Update Project (Protected)
router.put("/:id", isAuthenticated, (req, res, next) => {
  const { title, description, technologies, link, images } = req.body;
  const userId = req.payload._id;

  Project.findOneAndUpdate(
    { _id: req.params.id, userId },
    { title, description, technologies, link, images },
    { new: true }
  )
    .then(updatedProject => {
      if (!updatedProject) return res.status(404).json({ message: "Project not found" });
      res.json(updatedProject);
    })
    .catch(error => {
      console.error("Error while updating Project ->", error.message);
      next(error);
    });
});


// Delete Project (Protected)
router.delete("/:id", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Project.findOneAndDelete({ _id: req.params.id, userId })
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
