import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();

// Middlewares-------------
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes----------------

// error handler-------------
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode || 500)
      .json(new ApiResponse(err.statusCode, null, err.message || "error"));
  }
});

export { app };
