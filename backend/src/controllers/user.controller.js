import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { oAuth2Client } from "../utils/googleConfig.js";
import axios from "axios";

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
    const cookieOptions = {};
    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(new ApiResponse(200, user, "User logged in successfully"));
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
// google login

const googleLogin = async (req, res, next) => {
  try {
    const { code } = req.query;
    const googleRes = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(googleRes.tokens);
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const user = await User.findOne({ email: userResponse.data.email });
    if (!user) {
      const newUser = await User.create({
        userName: userResponse.data.given_name,
        email: userResponse.data.email,
        password: userResponse.data.id,
      });
      const token = newUser.getJwtToken();
      return res
        .status(200)
        .cookie("token", token)
        .json(new ApiResponse(200, newUser, "Account created successfully"));
    }

    const token = user.getJwtToken();
    return res
      .status(200)
      .cookie("token", token)
      .json(new ApiResponse(200, user, "User logged in successfully"));
  } catch (error) {
    console.log(error);
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

// get user
const getUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new ApiError(400, "User not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully"));
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

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

// delete user account

const deleteUserAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return next(new ApiError(400, "User not found"));
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(new ApiError(400, "User not found"));
    }
    return res
      .clearCookie("token")
      .status(200)
      .json(new ApiResponse(200, user, "User deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, error.message || "something went wrong"));
  }
};

export {
  register,
  login,
  logout,
  updateProfile,
  getUser,
  deleteUserAccount,
  googleLogin,
};
