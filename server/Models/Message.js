import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
     
    },
   
    firstName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
     read: {
    type: Boolean,
    default: false,  // new messages start as unread
  }
  },
  { timestamps: true }
);

// hash password before saving


export default mongoose.model("Message", messageSchema);