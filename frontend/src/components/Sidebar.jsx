// components/Sidebar.js
import React from 'react';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-5">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Gemini Clone</h2>
      </div>
      <div>
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          + New Chat
        </button>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Recent</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">What is React?</li>
            <li className="cursor-pointer hover:bg-gray-200 p-2 rounded">How to use Gemini API?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
