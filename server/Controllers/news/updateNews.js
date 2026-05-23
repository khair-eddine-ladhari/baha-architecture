import News from "../../Models/News.js";

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, date, published } = req.body;

    // 1. find news by id
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // 2. update fields
    if (title)     news.title     = title;
    if (content)   news.content   = content;
    if (date)      news.date      = date;
    if (published !== undefined) news.published = published;

    // 3. save
    await news.save();

    res.status(200).json({
      message: "News updated successfully",
      news,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};