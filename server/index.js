import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://basic-react-chat-app-using-socket-i.vercel.app",
    ],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("User got connected! ✅");

  socket.on("message", (message) => {
    console.log("Message Received: ", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User got disconnected! ❌");
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`The Server is running on PORT: ${PORT}`);
});
