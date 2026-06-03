import Project from "../../Models/Projects.js";
import cloudinary from "../../config/cloudinary.js";

import mongoose from "mongoose";

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};