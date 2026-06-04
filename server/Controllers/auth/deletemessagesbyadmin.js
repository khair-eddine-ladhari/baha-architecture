
import Message from "../../Models/Message.js";



const deletemessagesbyadmin = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.status(200).json({ message: "Message deleted successfully" });
    }catch (error) {
  console.error(error);
  res.status(500).json({ 
    message: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : error.message 
  });
}
};


export default deletemessagesbyadmin;