import express from "express";
import { userChat } from "../controllers/chat.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// chat route
router.route("/chat").post(isAuth, userChat);

export default router;
