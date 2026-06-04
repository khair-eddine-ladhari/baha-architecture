




import Message from "../../Models/Message.js";




const getmessagesbyadmin = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json({ messages });
    } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};

export default getmessagesbyadmin;


