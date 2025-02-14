"use client";

import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast, Toaster } from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
export default function Resgister() {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      console.log(document.cookie.split("=")[1]);
      navigate("/", { replace: true });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.loading("loading...", { id: "loading" });
    axios
      .post("api/v1/users/register", data)
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        setData({
          userName: "",
          email: "",
          password: "",
        });
        toast.dismiss("loading");
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center dark:bg-neutral-950 h-screen dark:text-white text-black flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl dark:text-white text-black text-center mb-3 p-2   dark:text-white border border-gray-300 rounded-t-2xl w-[80%] mx-auto mt-5">
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col  border border-gray-300 p-6  gap-10 w-[80%]"
      >
        <div>
          <div className="mb-2 block">
            <label htmlFor="username" className="dark:text-white text-black">
              username
            </label>
          </div>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            required
            className="border border-gray-300 dark:text-white text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={data.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="email" className="dark:text-white text-black">
              Emial
            </label>
          </div>
          <input
            id="email1"
            type="email"
            placeholder="name@gamil.com"
            required
            className="border border-gray-300 dark:text-white text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="password" className="dark:text-white text-black">
              Password
            </label>
          </div>
          <input
            id="password1"
            type="password"
            placeholder="password"
            required
            className="border border-gray-300 dark:text-white text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          className="dark:bg-white  bg-black p-2 text-white rounded-4xl dark:text-black"
        >
          Sign Up
        </Button>
      </form>
      <NavLink
        to={"/login"}
        className="  dark:text-white border border-gray-300 rounded-b-2xl w-[80%] mx-auto mt-3 p-2 text-center"
      >
        Already have an account?
      </NavLink>
      <GoogleLogin />
    </div>
  );
}
