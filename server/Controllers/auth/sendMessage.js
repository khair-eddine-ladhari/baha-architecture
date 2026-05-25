
import Message from "../../Models/Message.js";



const sendMessage = async (req, res) => {
    try {
        const { firstName, email, lastName } = req.body;

        

        const newMessage = new Message({ firstName, email, lastName });
        await newMessage.save();

        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default sendMessage;