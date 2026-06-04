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
      enum: ["Residential", "Commercial", "Homepage", "Medical"],
      required: true,
    },
    cover_image: {
      type: String,    // cloudinary URL
      required: true,
    },
    images: [
      { type: String,
      required:true,
       }
    ],
    published: {
      type: Boolean,
      
      
    },

  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);