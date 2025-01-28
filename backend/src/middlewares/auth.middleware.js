import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const isAuth = async (req, _, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ApiError(401, "User not authenticated"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
