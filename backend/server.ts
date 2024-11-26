import express from "express";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// API route to fetch all messages
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "asc" }, // Sort messages by creation time
    });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for "send_message" event
  socket.on("send_message", async (data: { name: string; content: string }) => {
    const { name, content } = data;

    try {
      // Save the message to the database
      const newMessage = await prisma.message.create({
        data: { name, content, createdAt: new Date().getTime() },
      });

      // Broadcast the new message to all connected clients
      io.emit("new_message", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
