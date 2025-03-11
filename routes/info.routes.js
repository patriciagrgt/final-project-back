import express from "express";
import Info from "../models/Info.model.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Create Info
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

// Get Info by ID
router.get("/user/:userId", (req, res, next) => {
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
  
  // Actualizar info por userId
  router.put("/:id", isAuthenticated, (req, res, next) => {
    Info.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedInfo => {
        if (!updatedInfo) return res.status(404).json({ message: "Info not found" });
        res.json(updatedInfo);
      })
      .catch(error => {
        console.error("Error while updating Info ->", error.message);
        next(error);
      });
  });
  
  // Eliminar info por userId
  router.delete("/:id", isAuthenticated, (req, res, next) => {
    Info.findByIdAndDelete(req.params.id)
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