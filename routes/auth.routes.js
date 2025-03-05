import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();
const saltRounds = 10;

// Signup (Create User)
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Provide email, password and name" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Provide a valid email address." });
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) return res.status(400).json({ message: "User already exists." });

      return bcrypt.genSalt(saltRounds);
    })
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
      return User.create({ email, password: hashedPassword, name });
    })
    .then(createdUser => {
      res.status(201).json({ _id: createdUser._id, email: createdUser.email, name: createdUser.name });
    })
    .catch(error => {
      console.error("Error while signing up ->", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password." });
  }

  let foundUser;

  User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({ status: 401, message: "User not found." });

      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(passwordCorrect => {
      if (!passwordCorrect) return Promise.reject({ status: 401, message: "Invalid credentials." });

      const { _id, name } = foundUser;
      const payload = { _id, name, email };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.status(200).json({ authToken });
    })
    .catch(error => {
      console.error("Error while logging in ->", error.message);
      res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    });
});

// Verify Token
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("req.payload ->", req.payload);
  res.status(200).json(req.payload);
});

export default router;
