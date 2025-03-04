import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();
const saltRounds = 10;

// Create User (Signup)
router.post("/", (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Provide name, email, and password" });
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  User.create({ name, email, password: hashedPassword })
    .then((createdUser) => {
      console.log("User created ->", createdUser);
      const { _id, name, email } = createdUser;
      res.status(201).json({ _id, name, email });
    })
    .catch((error) => {
      console.error("Error while creating User ->", error.message);
      next(error);
    });
});

// Login User
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password." });
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ message: "User not found." });
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (!passwordCorrect) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const { _id, name, email } = foundUser;
      const payload = { _id, name, email };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "48h" });

      res.status(200).json({ authToken });
    })
    .catch((error) => {
      console.error("Error while logging in ->", error.message);
      next(error);
    });
});

// Get all Users (Protected)
router.get("/", isAuthenticated, (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => {
      console.error("Error while fetching Users ->", error.message);
      next(error);
    });
});

// Get User by ID (Protected)
router.get("/:id", isAuthenticated, (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    })
    .catch((error) => {
      console.error("Error while fetching User ->", error.message);
      next(error);
    });
});

// Update User (Protected)
router.put("/:id", isAuthenticated, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    })
    .catch((error) => {
      console.error("Error while updating User ->", error.message);
      next(error);
    });
});

// Delete User (Protected)
router.delete("/:id", isAuthenticated, (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    })
    .catch((error) => {
      console.error("Error while deleting User ->", error.message);
      next(error);
    });
});

export default router;
