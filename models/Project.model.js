import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: { type: String },
    technologies: [{ type: String }],
    link: { type: String },
    images: [{ type: String }],
}, {
    timestamps: true,
    versionKey: false
});

const Project = model("Project", projectSchema);

export default Project;