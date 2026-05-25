import News from "../../Models/News.js";

export const getNews = async (req, res) => {
  try {
    const news = await News.find()
      .select("title date body")
      .sort({ date: -1 });

    res.status(200).json(news);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};