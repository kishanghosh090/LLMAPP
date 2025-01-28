import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

// register user
const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    //validate
    if ([userName, email, password].some((value) => !value)) {
      return next(new ApiError(400, "All fields are required"));
    }
    // is user exist
    const user = await User.findOne({ email });
    if (user) {
      return next(new ApiError(400, "User already exist"));
    }

    // create user
    const newUser = await User.create({
      userName,
      email: email.toLowerCase(),
      password,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, newUser, "User created successfully"));
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

// login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //validate
    if ([email, password].some((value) => !value)) {
      return next(new ApiError(400, "All fields are required"));
    }
    // is user exist
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(400, "User not found"));
    }

    // check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ApiError(400, "Invalid credentials"));
    }

    const token = user.getJwtToken();
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(new ApiResponse(200, user, "User logged in successfully"));
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

// logout user
const logout = async (req, res, next) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("token", cookieOptions)
      .json(new ApiResponse(200, null, "User logged out successfully"));
  } catch (error) {
    next(new ApiError(500, error.message));
  }
}; // register user

//update profilr

const updateProfile = async (req, res, next) => {
  try {
    const { userName } = req.body;
    const user = await User.findById(req.user._id);
    user.userName = userName;
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User profile updated successfully"));
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export { register, login, logout, updateProfile };
