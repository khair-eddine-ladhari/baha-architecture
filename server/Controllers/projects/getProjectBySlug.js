import Project from "../../Models/Projects.js";

export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({slug});
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);

  } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};