


// Controllers/getVisitorCount.js
import Visitor from "../Models/Visitor.js";

const formatLabel = (date) =>
  date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

const getDailyVisits = (visitor, days = 30) => {
  const countsByDate = new Map(
    (visitor?.dailyVisits || []).map((day) => [day.date, day.count])
  );

  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - index));

    const key = date.toISOString().slice(0, 10);

    return {
      date: formatLabel(date),
      visits: countsByDate.get(key) || 0
    };
  });
};

const getVisitorCount = async (req, res) => {
  try {
    const visitor = await Visitor.findOne();
    res.status(200).json({
      totalVisits: visitor?.count || 0,
      uniqueVisitors: visitor?.uniqueIPs?.length || 0,
      dailyVisits: getDailyVisits(visitor)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getVisitorCount;
