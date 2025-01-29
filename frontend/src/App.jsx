// App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatInterface messages={messages} addMessage={addMessage} />
    </div>
  );
}

export default App;
