
import Message from "../../Models/Message.js";



const sendMessage = async (req, res) => {
    try {
        const { firstName, email, message } = req.body;

        

        const newMessage = new Message({ firstName, email, message });
        await newMessage.save();

        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};

export default sendMessage;