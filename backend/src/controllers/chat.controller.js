import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { apiRes } from "../utils/aiResponse.js";
import { Chat } from "../models/chat.models.js";

// user chat
const userChat = async (req, res, next) => {
  try {
    const { userText } = req.body;
    const user = req.user;

    if (!user) {
      const aiResponse = await apiRes(userText);
      if (!aiResponse) {
        return next(new ApiError(400, "Internal server error"));
      }
      return res.status(200).json(new ApiResponse(200, aiResponse, "success"));
    }

    const aiResponse = await apiRes(userText);
    const newChat = await Chat.create({
      chatName: userText,
      aiResponse,
      userText,
      user: user._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, newChat, "Chat created successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};
export { userChat };
