import express from "express";
import Profile from "../models/Profile.model.js";

const router = express.Router();

// Create Profile
router.post("/", (req, res, next) => {
  Profile.create({
    userId: req.body.userId,
    bio: req.body.bio,
    skills: req.body.skills,
    experience: req.body.experience,
    education: req.body.education,
    location: req.body.location,
    socialLinks: req.body.socialLinks,
  })
    .then((createdProfile) => {
      console.log("Profile created ->", createdProfile);
      res.status(201).json(createdProfile);
    })
    .catch((error) => {
      console.error("Error while creating Profile ->", error.message);
      next(error);
    });
});

// Get all Profiles
router.get("/", (req, res, next) => {
  Profile.find()
    .then((profiles) => res.json(profiles))
    .catch((error) => {
      console.error("Error while fetching Profiles ->", error.message);
      next(error);
    });
});

// Get Profile by ID
router.get("/:userId", (req, res, next) => {
  Profile.findOne({ userId: req.params.userId })
    .then((profile) => {
      if (!profile) return res.status(404).json({ message: "Profile not found" });
      res.json(profile);
    })
    .catch((error) => next(error));
});

// Update Profile
router.put("/:userId", (req, res, next) => {
  Profile.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true })
    .then((updatedProfile) => {
      if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
      res.json(updatedProfile);
    })
    .catch((error) => next(error));
});

// Delete Profile
router.delete("/:userId", (req, res, next) => {
  Profile.findOneAndDelete({ userId: req.params.userId })
    .then((deletedProfile) => {
      if (!deletedProfile) return res.status(404).json({ message: "Profile not found" });
      res.json({ message: "Profile deleted successfully" });
    })
    .catch((error) => next(error));
});

export default router;
