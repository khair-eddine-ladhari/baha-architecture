import Project from "../../Models/Projects.js";
import cloudinary from "../../config/cloudinary.js";

export const deleteProjectImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;

    // 1. find project by id
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. find image in project
    const image = project.images.find(
      (img) => img._id.toString() === imageId
    );
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 3. delete from cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // 4. remove from project images array
    project.images = project.images.filter(
      (img) => img._id.toString() !== imageId
    );

    // 5. save project
    await project.save();

    res.status(200).json({
      message: "Image deleted successfully",
      images: project.images,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};