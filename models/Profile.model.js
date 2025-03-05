import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const profileSchema = new Schema({
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
          endDate: { type: Date },
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
    socialLinks: [{
        platform: String,
        url: String
    }],
},{ timestamps: true });

const Profile = model("Profile", profileSchema);

export default Profile;