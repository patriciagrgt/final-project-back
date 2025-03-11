import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const infoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  info: { type: String, required: true },
}, { timestamps: true, versionKey: false }
);

const Info = model("Info", infoSchema);

export default Info;