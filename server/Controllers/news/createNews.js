import News from "../../Models/News.js";

export const createNews = async (req, res) => {
  try {
    const { title, content, date } = req.body;

    const news = new News({
      title,
      content,
      date: date || Date.now(),
      published: true,
    });

    await news.save();

    res.status(201).json({
      message: "News created successfully",
      news,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};