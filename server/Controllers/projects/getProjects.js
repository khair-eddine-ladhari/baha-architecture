import Project from "../../Models/Projects.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .select("title slug location year category cover_image description images")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message  });
  }
};