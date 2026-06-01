


// Models/Visitor.js
import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
  uniqueIPs: [String],
  dailyVisits: [
    {
      date: { type: String, required: true },
      count: { type: Number, default: 0 }
    }
  ],
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("Visitor", visitorSchema);
