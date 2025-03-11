import express from "express";
import Curriculum from "../models/Curriculum.model.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Create Curriculum (Protected)
router.post("/", isAuthenticated, (req, res, next) => {
  Curriculum.create({
    userId: req.payload._id, // Se usa el ID del usuario autenticado
    bio: req.body.bio,
    skills: req.body.skills,
    experience: req.body.experience,
    education: req.body.education,
    location: req.body.location,
  })
    .then((createdCurriculum) => {
      console.log("Curriculum created ->", createdCurriculum);
      res.status(201).json(createdCurriculum);
    })
    .catch((error) => {
      console.error("Error while creating Curriculum ->", error.message);
      next(error);
    });
});

// Get Curriculum by User ID (Protected)
router.get("/user/:userId", isAuthenticated, (req, res, next) => {
  Curriculum.findOne({ userId: req.params.userId })
    .then(curriculum => {
      if (!curriculum) return res.status(404).json({ message: "Curriculum not found" });
      res.json(curriculum);
    })
    .catch(error => {
      console.error("Error while fetching Curriculum ->", error.message);
      next(error);
    });
});

// Update Curriculum (Protected)
router.put("/:id", isAuthenticated, (req, res, next) => {
  const { bio, skills, experience, education, location } = req.body;
  const userId = req.payload._id;

  Curriculum.findOneAndUpdate(
    { _id: req.params.id, userId },
    { bio, skills, experience, education, location },
    { new: true }
  )
    .then(updatedCurriculum => {
      if (!updatedCurriculum) return res.status(404).json({ message: "Curriculum not found" });
      res.json(updatedCurriculum);
    })
    .catch(error => {
      console.error("Error while updating Curriculum ->", error.message);
      next(error);
    });
});

// Delete Curriculum (Protected)
router.delete("/:id", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Curriculum.findOneAndDelete({ _id: req.params.id, userId })
    .then(deletedCurriculum => {
      if (!deletedCurriculum) return res.status(404).json({ message: "Curriculum not found" });
      res.json({ message: "Curriculum deleted successfully" });
    })
    .catch(error => {
      console.error("Error while deleting Curriculum ->", error.message);
      next(error);
    });
});

export default router;
