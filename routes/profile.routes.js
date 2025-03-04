import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// Create Profile
router.post("/", (req, res, next) => {
  Profile.create({
    userId: req.body.userId,
    bio: req.body.bio,
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
router.get("/:id", (req, res, next) => {
  Profile.findById(req.params.id)
    .then((profile) => {
      if (!profile) return res.status(404).json({ message: "Profile not found" });
      res.json(profile);
    })
    .catch((error) => {
      console.error("Error while fetching Profile ->", error.message);
      next(error);
    });
});

// Update Profile
router.put("/:id", (req, res, next) => {
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedProfile) => {
      if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
      res.json(updatedProfile);
    })
    .catch((error) => {
      console.error("Error while updating Profile ->", error.message);
      next(error);
    });
});

// Delete Profile
router.delete("/:id", (req, res, next) => {
  Profile.findByIdAndDelete(req.params.id)
    .then((deletedProfile) => {
      if (!deletedProfile) return res.status(404).json({ message: "Profile not found" });
      res.json({ message: "Profile deleted successfully" });
    })
    .catch((error) => {
      console.error("Error while deleting Profile ->", error.message);
      next(error);
    });
});

export default router;
