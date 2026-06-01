




// middleware/visitorCounter.js
import Visitor from "../Models/Visitor.js";

const getDateKey = () => new Date().toISOString().slice(0, 10);

export const countVisitor = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const forwardedFor = req.headers["x-forwarded-for"];
    const ip = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(",")[0]?.trim() || req.socket.remoteAddress;

    const today = getDateKey();
    const visitor = await Visitor.findOne();

    if (!visitor) {
      await Visitor.create({
        count: 1,
        uniqueIPs: ip ? [ip] : [],
        dailyVisits: [{ date: today, count: 1 }],
        lastUpdated: new Date()
      });
    } else {
      const todayIndex = visitor.dailyVisits.findIndex((day) => day.date === today);

      visitor.count += 1;
      visitor.lastUpdated = new Date();

      if (ip && !visitor.uniqueIPs.includes(ip)) {
        visitor.uniqueIPs.push(ip);
      }

      if (todayIndex >= 0) {
        visitor.dailyVisits[todayIndex].count += 1;
      } else {
        visitor.dailyVisits.push({ date: today, count: 1 });
      }

      visitor.dailyVisits = visitor.dailyVisits.slice(-90);
      await visitor.save();
    }

    next();
  } catch (error) {
    next(error);
  }
};
