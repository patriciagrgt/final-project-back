import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const ContactSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: { type: String },
  phoneNumber: { type: String },
  socialLinks: [{
    platform: String,
    url: String
  }],
});

const Contact = model("Contact", ContactSchema);

export default Contact;