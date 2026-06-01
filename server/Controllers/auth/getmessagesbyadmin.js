




import Message from "../../Models/Message.js";




const getmessagesbyadmin = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default getmessagesbyadmin;


