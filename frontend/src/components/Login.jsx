"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Group, Box, MantineProvider } from "@mantine/core";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [visible, { toggle }] = useDisclosure(false);

  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      console.log(document.cookie.split("=")[1]);
      navigate("/", { replace: true });
    }
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.loading("loading...", { id: "loading" });
    axios
      .post("api/v1/users/login", data)
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
          navigate("/", { replace: true });
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        toast.dismiss("loading");
        return;
      });
  };
  return (
    <MantineProvider>
      <div className="flex items-center justify-center dark:bg-neutral-950 h-screen dark:text-white text-black flex-col">
        <h1 className="text-3xl text-black text-center mb-3 p-2   dark:text-white border border-gray-300 rounded-t-2xl w-[80%] mx-auto mt-5">
          Sign In
        </h1>
        <Toaster />
        <form
          onSubmit={handleSubmit}
          className="flex max-w-md flex-col  border border-gray-300 p-6  gap-10 w-[80%]"
        >
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
          <div>
            <NavLink>Forget Password?</NavLink>
          </div>

          <Button
            type="submit"
            className="dark:bg-white bg-black text-white rounded-4xl dark:text-black"
          >
            Sign In
          </Button>
        </form>
        <NavLink
          to={"/register"}
          className="  dark:text-white border border-gray-300 rounded-b-2xl w-[80%] mx-auto mt-3 p-2 text-center"
        >
          Create Account
        </NavLink>
      </div>
    </MantineProvider>
  );
}
