import express from "express";
import Contact from "../models/Contact.model.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Create Contact
router.post("/", isAuthenticated, (req, res, next) => {
  Contact.create({
    userId: req.payload._id, // Se usa el ID del usuario autenticado
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    socialLinks: req.body.socialLinks,
  })
    .then((createdContact) => {
      console.log("Contact created ->", createdContact);
      res.status(201).json(createdContact);
    })
    .catch((error) => {
      console.error("Error while creating Contact ->", error.message);
      next(error);
    });
});

// Get Contact by ID
router.get("/user/:userId", (req, res, next) => {
    Contact.findOne({ userId: req.params.userId })
      .then(contact => {
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
      })
      .catch(error => {
        console.error("Error while fetching Contact ->", error.message);
        next(error);
      });
  });
  
  // Actualizar Contact por userId
  router.put("/:id", isAuthenticated, (req, res, next) => {
    Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedContact => {
        if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
        res.json(updatedContact);
      })
      .catch(error => {
        console.error("Error while updating Contact ->", error.message);
        next(error);
      });
  });
  
  // Eliminar Contact por userId
  router.delete("/:id", isAuthenticated, (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id)
      .then(deletedContact => {
        if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
      })
      .catch(error => {
        console.error("Error while deleting Contact ->", error.message);
        next(error);
      });
  });

  export default router;