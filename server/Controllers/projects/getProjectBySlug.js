import Project from "../../Models/Projects.js";

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({ slug, published: true });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};