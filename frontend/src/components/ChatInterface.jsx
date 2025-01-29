// components/ChatInterface.js
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCUJE_BHjI41G-9VuJo8Y6Rgq-MZTPLBpg");

function ChatInterface({ messages, addMessage }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            } max-w-3/4`}
          >
            {message.text}
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
          className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
