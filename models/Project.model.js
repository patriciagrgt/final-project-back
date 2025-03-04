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
    technologies: [String],
    link: { type: String },
    image: { type: String },
  }, { timestamps: true });

  const Project = model("Project", projectSchema);
  
  export default Project;