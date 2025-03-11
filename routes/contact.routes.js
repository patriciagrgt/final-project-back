import express from "express";
import Contact from "../models/Contact.model.js";
import { isAuthenticated } from "../middlewares/jwt.middleware.js";

const router = express.Router();

// Create Contact (Protected)
router.post("/", isAuthenticated, (req, res, next) => {
    Contact.create({
        userId: req.payload._id, // Se usa el ID del usuario autenticado
        email: req.body.email,
        phone: req.body.phone,
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

// Get Contact by User ID (Protected)
router.get("/user/:userId", isAuthenticated, (req, res, next) => {
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

// Update Contact (Protected)
router.put("/:id", isAuthenticated, (req, res, next) => {
    const { email, phone, socialLinks } = req.body;
    const userId = req.payload._id;

    Contact.findOneAndUpdate(
        { _id: req.params.id, userId },
        { email, phone, socialLinks },
        { new: true }
    )
        .then(updatedContact => {
            if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
            res.json(updatedContact);
        })
        .catch(error => {
            console.error("Error while updating Contact ->", error.message);
            next(error);
        });
});


// Delete Contact (Protected)
router.delete("/:id", isAuthenticated, (req, res, next) => {
    const userId = req.payload._id;
  
    Contact.findOneAndDelete({ _id: req.params.id, userId })
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