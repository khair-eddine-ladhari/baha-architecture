import News from "../../Models/News.js";

export const getNews = async (req, res) => {
  try {
    const news = await News.find()
      .select("title date content")
      .sort({ date: -1 });

    res.status(200).json(news);

  } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};