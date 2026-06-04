import Project from "../../Models/Projects.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";
import { Readable } from "stream";

function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    Readable.from(buffer).pipe(stream);
  });
}

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, description, year, category, buildings } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ cover image — use new file if uploaded, else keep existing
    let cover_image = project.cover_image;
    if (req.files?.cover_image?.[0]) {
      const coverResult = await uploadToCloudinary(
        req.files.cover_image[0].buffer,
        "projects/covers"
      );
      cover_image = coverResult.secure_url;
    }

    // ✅ existing images to keep
    const existing_images = req.body.existing_images
      ? JSON.parse(req.body.existing_images)
      : project.images;

    // ✅ new images to upload
    let newImages = [];
    if (req.files?.images?.length) {
      newImages = await Promise.all(
        req.files.images.map((file) =>
          uploadToCloudinary(file.buffer, "projects/images")
            .then((result) => result.secure_url)
        )
      );
    }

    // ✅ merge existing + new
    const images = [...existing_images, ...newImages];

    // update fields
    project.title = title || project.title;
    project.slug = title ? slugify(title, { lower: true, strict: true }) : project.slug;
    project.location = location || project.location;
    project.description = description || project.description;
    project.year = year || project.year;
    project.category = category || project.category;
    project.buildings = buildings || project.buildings;
    project.cover_image = cover_image;
    project.images = images;

    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
    });
  }
};