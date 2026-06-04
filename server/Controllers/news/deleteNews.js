import News from "../../Models/News.js";

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. find news
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // 2. delete from MongoDB
    await News.findByIdAndDelete(id);

    res.status(200).json({
      message: "News deleted successfully",
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