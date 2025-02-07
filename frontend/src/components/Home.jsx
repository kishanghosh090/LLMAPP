// App.js
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatInterface from "./ChatInterface";
import { BiMenuAltLeft } from "react-icons/bi";
import { animate, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [messages, setMessages] = useState([]);
  const [isClosed, setIsClosed] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      console.log(document.cookie.split("=")[1]);

      setIsLogin(true);
      axios
        .get("api/v1/users/getUser")
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: "100vw",
      transition: {
        duration: 0.5,
      },
    },
  };

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    { isLogin } && (
      <div className="dark:bg-neutral-950 h-screen z-[1000]">
        {isClosed && (
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-[100vw] h-[100vh] duration-150 transation-all fixed z-[1000]"
          >
            {" "}
            <Sidebar isLogin={isLogin} data={data} />
          </motion.div>
        )}
        <div className="flex h-[90vh] z-50 overflow-hidden dark:bg-neutral-950">
          <div
            className={`absolute text-3xl top-2 left-2 cursor-pointer  ${
              isClosed === true ? "text-black " : " dark:text-white text-black"
            } z-[1000]`}
            onClick={() => {
              setIsClosed(!isClosed);
            }}
          >
            <BiMenuAltLeft />
          </div>

          <ChatInterface messages={messages} addMessage={addMessage} />
        </div>
      </div>
    )
  );
}

export default Home;
