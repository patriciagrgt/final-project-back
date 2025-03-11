import mongoose from 'mongoose';
import { Schema, model } from "mongoose";

const infoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  info: { type: String, required: true },
});

const Info = model("Info", infoSchema);

export default Info;