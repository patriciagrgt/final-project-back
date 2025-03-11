import express from "express";
import Info from "../models/Info.model.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Create Info (Protected)
router.post("/", isAuthenticated, (req, res, next) => {
  Info.create({
    userId: req.payload._id, // Se usa el ID del usuario autenticado
    info: req.body.info,
  })
    .then((createdInfo) => {
      console.log("Info created ->", createdInfo);
      res.status(201).json(createdInfo);
    })
    .catch((error) => {
      console.error("Error while creating Info ->", error.message);
      next(error);
    });
});

// Get Info by User ID (Protected)
router.get("/user/:userId", isAuthenticated, (req, res, next) => {
    Info.findOne({ userId: req.params.userId })
      .then(info => {
        if (!info) return res.status(404).json({ message: "Info not found" });
        res.json(info);
      })
      .catch(error => {
        console.error("Error while fetching Info ->", error.message);
        next(error);
      });
  });
  
  // Update Info (Protected)
  router.put("/:id", isAuthenticated, (req, res, next) => {
    const { info } = req.body;
    const userId = req.payload._id;
  
    Info.findOneAndUpdate(
      { _id: req.params.id, userId },
      { info },
      { new: true }
    )
      .then(updatedInfo => {
        if (!updatedInfo) return res.status(404).json({ message: "Info not found" });
        res.json(updatedInfo);
      })
      .catch(error => {
        console.error("Error while updating Info ->", error.message);
        next(error);
      });
  });
  
  // Delete Info (Protected)
  router.delete("/:id", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id;
  
    Info.findOneAndDelete({ _id: req.params.id, userId })
      .then(deletedInfo => {
        if (!deletedInfo) return res.status(404).json({ message: "Info not found" });
        res.json({ message: "Info deleted successfully" });
      })
      .catch(error => {
        console.error("Error while deleting Info ->", error.message);
        next(error);
      });
  });

  export default router;