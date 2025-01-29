// components/Sidebar.js
import React from "react";
import { IoMdSettings } from "react-icons/io";
function Sidebar() {
  return (
    <div className="w-50 bg-gray-100 p-5 h-full pt-10 flex flex-col justify-around">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Gemini Clone</h2>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          + New Chat
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent</h3>
        <ul className="space-y-2">
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">
            What is React?
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">
            How to use Gemini API?
          </li>
        </ul>
      </div>
      <div className=" flex  bg-blue-300 justify-around items-center p-1 rounded-4xl">
        <div>
          {" "}
          <h3 className=" ">kishan</h3>
        </div>
        <div className="text-2xl">
          <IoMdSettings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
