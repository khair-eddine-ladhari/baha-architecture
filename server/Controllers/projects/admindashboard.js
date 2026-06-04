



import Project from "../../Models/Projects.js";
import cloudinary from "../../config/cloudinary.js";

export const admindashboard = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. find project by id
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. delete cover image from cloudinary
    await cloudinary.uploader.destroy(project.cover_image.public_id);

    // 3. delete all images from cloudinary
    await Promise.all(
      project.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      })
    );

    // 4. delete project from MongoDB
    await Project.findByIdAndDelete(id);

    res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};