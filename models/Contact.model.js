import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const ContactSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: { type: String },
    phone: { type: String },
    socialLinks: [{
        platform: String,
        url: String
    },],
},
    { timestamps: true, versionKey: false }
);

const Contact = model("Contact", ContactSchema);

export default Contact;