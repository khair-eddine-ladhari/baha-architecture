import Project from "../../Models/Projects.js";
import slugify from "slugify";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, description, year, category, published } = req.body;

    // 1. find project by id
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 2. update slug if title changed
    if (title) {
      project.title = title;
      project.slug = slugify(title, {
        lower: true,
        strict: true,
      });
    }

    // 3. update text fields
    if (location)    project.location    = location;
    if (description) project.description = description;
    if (year)        project.year        = year;
    if (category)    project.category    = category;
    if (published !== undefined) project.published = published;

    // 4. update cover image if new one sent
    if (req.files && req.files.cover_image) {

      // delete old cover from cloudinary
      const oldPublicId = project.cover_image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`projects/covers/${oldPublicId}`);

      // upload new cover
      const coverResult = await cloudinary.uploader.upload(
        req.files.cover_image[0].path, {
        folder: "projects/covers",
      });

      // delete temp file
      fs.unlinkSync(req.files.cover_image[0].path);

      project.cover_image = coverResult.secure_url;
    }

    // 5. add new images if sent
    if (req.files && req.files.images) {
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

      // add new images to existing images
      project.images.push(...newImages);
    }

    // 6. save updated project
    await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};