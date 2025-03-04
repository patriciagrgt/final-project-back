import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Create Project
router.post("/", (req, res, next) => {
  Project.create({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies,
    repositoryUrl: req.body.repositoryUrl,
    liveDemoUrl: req.body.liveDemoUrl,
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

// Get Project by ID
router.get("/:id", (req, res, next) => {
  Project.findById(req.params.id)
    .then((project) => {
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    })
    .catch((error) => {
      console.error("Error while fetching Project ->", error.message);
      next(error);
    });
});

// Update Project
router.put("/:id", (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedProject) => {
      if (!updatedProject) return res.status(404).json({ message: "Project not found" });
      res.json(updatedProject);
    })
    .catch((error) => {
      console.error("Error while updating Project ->", error.message);
      next(error);
    });
});

// Delete Project
router.delete("/:id", (req, res, next) => {
  Project.findByIdAndDelete(req.params.id)
    .then((deletedProject) => {
      if (!deletedProject) return res.status(404).json({ message: "Project not found" });
      res.json({ message: "Project deleted successfully" });
    })
    .catch((error) => {
      console.error("Error while deleting Project ->", error.message);
      next(error);
    });
});

export default router;
