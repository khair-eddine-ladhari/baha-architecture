

import Message from "../../Models/Message.js";  

const markasreadmessagesbyadmin = async (req, res) => {
    try {
        const messageId = req.params.id;
        await Message.findByIdAndUpdate(messageId, { read: true });
        res.status(200).json({ message: "Message marked as read successfully" });
    }catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};
export default markasreadmessagesbyadmin;