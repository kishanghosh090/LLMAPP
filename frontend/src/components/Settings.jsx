import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Settings() {
  const location = useLocation();
  const userData = location.state;

  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setData(userData);
    setIsOpen(true);
  });
  const logout = () => {
    axios
      .get("api/v1/users/logout")
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "something went wrong");
      });
  };

  const navigate = useNavigate();
  return (
    <>
      <Toaster />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, transform: "translateX(100%)" }}
          animate={{ opacity: 1, transform: "translateX(0)" }}
          transition={{ duration: 0.2 }}
          className="p-8 h-screen dark:bg-neutral-950 text-white overflow-hidden"
        >
          <Toaster />
          <div className="flex justify-start items-center dark:bg-neutral-800  gap-2.5 p-4 rounded-2xl text-bold mb-10 ">
            <FaArrowLeft
              onClick={() => {
                navigate("/", { replace: true });
              }}
            />
            <span>Settings</span>
          </div>
          <div className="flex justify-start  flex-col gap-2">
            <h1>Profile</h1>
            <div className="flex justify-between dark:bg-neutral-800 flex-col gap-2.5 p-4 rounded-2xl text-bold">
              <div className="flex justify-between ">
                <span className="flex gap-2 items-center">
                  <FaRegUser />
                  username
                </span>
                <span>{data.userName}</span>
              </div>
              <div className="flex justify-between  ">
                <span className="flex gap-2 items-center">
                  <MdEmail />
                  Email
                </span>
                <span>{data.email}</span>
              </div>
            </div>
            <div
              onClick={logout}
              className="flex justify-statrt items-center dark:bg-neutral-800  gap-2.5 p-4 rounded-2xl text-bold "
            >
              <span>
                <MdLogout />
              </span>
              <span>Log out</span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Settings;
