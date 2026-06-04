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

export const createProject = async (req, res) => {
  try {
    const { title, location, description, year, category, buildings } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await Project.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Project title already exists" });
    }

    if (!req.files?.cover_image?.[0]) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    // ✅ upload from buffer
    const coverResult = await uploadToCloudinary(
      req.files.cover_image[0].buffer,
      "projects/covers"
    );
    const cover_image = coverResult.secure_url;

    let images = [];
    if (req.files?.images?.length) {
      images = await Promise.all(
        req.files.images.map((file) =>
          uploadToCloudinary(file.buffer, "projects/images")
            .then((result) => result.secure_url)
        )
      );
    }

    const project = new Project({
      title, slug, location, description, year, category, buildings,
      cover_image, images, published: true,
    });

    await project.save();

    res.status(201).json({ message: "Project created successfully", project });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
    });
  }
};