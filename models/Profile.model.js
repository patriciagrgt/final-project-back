import { Schema, model } from "mongoose";

const profileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: { type: String },
    location: { type: String },
    socialLinks: [{
        platform: String,
        url: String
    }],
},{ timestamps: true });

const Profile = model("Profile", profileSchema);

export default Profile;