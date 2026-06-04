import Project from "../../Models/Projects.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ category: "Homepage" })
      .select("title slug location year category cover_image description images")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  }catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};



export const getnbprojects = async (req, res) => {
  try {
    const projects = await Project.find()
      .select("title slug location year category cover_image description images")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};


export const getresidential = async (req, res) => {
  try {
    const projects = await Project.find({ category: "Residential" })
      .select("title slug location year category cover_image description images")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};




export const getmedical = async (req, res) => {
  try {
    const projects = await Project.find({ category: "Medical" })
      .select("title slug location year category cover_image description images")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};




export const getcommercial = async (req, res) => {
  try {
    const projects = await Project.find({ category: "Commercial" })
      .select("title slug location year category cover_image description images")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);

  }catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};






