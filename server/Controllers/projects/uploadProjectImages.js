import Project from "../../Models/Projects.js";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

export const uploadProjectImages = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. find project by id
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. check if images were sent
    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: "No images sent" });
    }

    // 3. upload each image to cloudinary
    const newImages = await Promise.all(
      req.files.images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "projects/images",
        });

        // delete temp file
        fs.unlinkSync(file.path);

        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    // 4. add new images to project
    project.images.push(...newImages);
    await project.save();

    res.status(200).json({
      message: "Images uploaded successfully",
      images: project.images,
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