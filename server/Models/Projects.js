import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Industrial", "residential", "cultural", "landscape", "interior", "urban"],
      
    },
    cover_image: {
      type: String,    // cloudinary URL
      required: true,
    },
    images: [
      { type: String }
    ],
    published: {
      type: Boolean,
      
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);