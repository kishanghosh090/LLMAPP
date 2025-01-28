import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatName: { type: String, trim: true },
  aiResponse: { type: String, trim: true },
  userText: { type: String, trim: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const Chat = mongoose.model("Chat", chatSchema);
