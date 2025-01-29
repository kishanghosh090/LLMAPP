// App.js
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import { BiMenuAltLeft } from "react-icons/bi";
import { animate, motion } from "framer-motion";

function App() {
  const [messages, setMessages] = useState([]);
  const [isClosed, setIsClosed] = useState(false);

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
    <div className="flex h-[90vh] overflow-hidden">
      <div
        className="absolute text-3xl top-2 left-2 cursor-pointer"
        onClick={() => {
          setIsClosed(!isClosed);
        }}
      >
        <BiMenuAltLeft />
      </div>
      {isClosed && (
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-64 h-[100vh] duration-150 transation-all">
          {" "}
          <Sidebar />
        </motion.div>
      )}
      <ChatInterface messages={messages} addMessage={addMessage} />
    </div>
  );
}

export default App;
