import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const curriculumSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: { type: String },
  skills: [{ type: String }],
  experience: [
    {
      title: { type: String },
      company: { type: String },
      startDate: { type: Date },
      endDate: {
        type: Date, validate: {
          validator: function (value) {
            return value >= this.startDate;
          },
          message: "End date must be after start date"
        }
      },
      description: { type: String },
    },
  ],
  education: [
    {
      degree: { type: String },
      institution: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],
  location: { type: String },
}, {
  timestamps: true,
  versionKey: false
});

const Curriculum = model("Curriculum", curriculumSchema);

export default Curriculum;
