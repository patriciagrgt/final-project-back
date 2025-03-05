import express from "express";
import User from "../models/User.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Get all Users (Protected)
router.get("/", isAuthenticated, (req, res, next) => {
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

