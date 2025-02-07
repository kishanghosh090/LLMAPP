// components/ChatInterface.js
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import home from "../assets/homeg.png";
import { Toaster, toast } from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";

const genAI = new GoogleGenerativeAI("AIzaSyCUJE_BHjI41G-9VuJo8Y6Rgq-MZTPLBpg");

function ChatInterface({ messages, addMessage }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const copyTextToClipboard = (text) => {
    toast.success("copied");
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({ text: input, sender: "user" });
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text().replaceAll("\n", "").replaceAll("*", "");
      addMessage({ text, sender: "ai" });
    } catch (error) {
      console.error("Error:", error);
      addMessage({
        text: "An error occurred. Please try again.",
        sender: "ai",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col p-5 mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <img
        src={home}
        alt=""
        className="absolute top-0 left-0 z-0 object-cover bg-cover md:w-full md:h-full"
      />
      <div className="flex-1 overflow-y-auto mb-4 ">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`relative mb-4 pt-8 p-10 rounded-lg z-[100] ${
              message.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            } max-w-3/4`}
            onClick={() => {
              copyTextToClipboard(message.text);
            }}
          >
            {message.text}
            <span className="absolute top-0 right-4 text-2xl  p-1 rounded-md">
              <MdContentCopy />
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="mb-4 p-3 rounded-lg bg-gray-100 max-w-3/4">
            Thinking...
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full  dark:text-white z-[100]"
        />
        <button
          type="submit"
          className="px-4 py-2 border border-blue-500  text-blue-400 rounded-r-2xl hover:bg-blue-600 transition duration-300 curser-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
