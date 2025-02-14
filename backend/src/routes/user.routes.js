import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

import {
  register,
  login,
  logout,
  updateProfile,
  getUser,
  deleteUserAccount,
  googleLogin,
} from "../controllers/user.controller.js";

router.route("/getUser").get(isAuth, getUser);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/auth/google").get(googleLogin);
router.route("/logout").get(logout);
router.route("/updateProfile").post(isAuth, updateProfile);
router.route("/deleteUserAccount").delete(isAuth, deleteUserAccount);

export default router;
