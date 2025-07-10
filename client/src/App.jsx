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

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div>
      <h1>Simple React Chat App</h1>

      <div>
        {messages.map((message, index) => (
          <p style={{ background: "gray" }} key={index}>
            {message}
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Enter your message here..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default App;
