import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1>Simple React Chat App</h1>

      <div>
        {messages.map((message, index) => (
          <p key={index} className="p-2 bg-zinc-400 m-2 rounded-md">
            {message}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Enter your message here..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        className="border-2 border-blue-300 rounded-md p-2"
      />

      <button
        className="rounded-md bg-black text-white p-2"
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default App;
