import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/updateProfile").post(isAuth, updateProfile);

export default router;
