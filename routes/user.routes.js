import express from "express";
import User from "../models/User.model.js";
import Curriculum from "../models/Curriculum.model.js"
import Project from "../models/Project.model.js"
import Contact from "../models/Contact.model.js"
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Get all Users (Protected)
router.get("/", (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => {
      console.error("Error while fetching Users ->", error.message);
      next(error);
    });
});

// Get User by ID (Protected)
router.get("/:id", isAuthenticated, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    })
    .catch(error => {
      console.error("Error while fetching User ->", error.message);
      next(error);
    });
});


//Get Profile User by ID (Protected)
router.get("/:id/profile", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Excluir password

    if (!user) return res.status(404).json({ message: "User not found" });

    const curriculum = await Curriculum.findOne({ userId: req.params.id });
    const projects = await Project.find({ userId: req.params.id });
    const contact = await Contact.findOne({ userId: req.params.id });

    res.json({
      ...user.toObject(),
      curriculum: curriculum ? curriculum.toObject() : null,
      projects:  Array.isArray(projects) ? projects.map(p => p.toObject()) : [],
      contact: contact ? contact.toObject() : null,
    });
  } catch (error) {
    console.error("Error while fetching User Profile ->", error.message);
    next(error);
  }
});


// Update User (Protected)
router.put("/:id", isAuthenticated, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedUser => {
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    })
    .catch(error => {
      console.error("Error while updating User ->", error.message);
      next(error);
    });
});

// Update only the "info" field of the user
router.put("/:id/info", isAuthenticated, (req, res, next) => {
  const { info } = req.body;
  User.findByIdAndUpdate(req.params.id, { info }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    })
    .catch(error => {
      console.error("Error while updating User info ->", error.message);
      next(error);
    });
});

// Delete User (Protected)
router.delete("/:id", isAuthenticated, (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(deletedUser => {
      if (!deletedUser) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    })
    .catch(error => {
      console.error("Error while deleting User ->", error.message);
      next(error);
    });
});

export default router;

