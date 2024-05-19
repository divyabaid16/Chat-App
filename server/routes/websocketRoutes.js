const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const mongoose = require('mongoose');

const websocketRoutes = (io) => {
  router.use((req, res, next) => {
    // Middleware function to log requests
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
      console.log("Received message:", data);

      const { groupId, messageString, sender } = data;

      const objectId = new mongoose.Types.ObjectId();

      console.log("objectId", objectId);

      const message = new Message({
        group: groupId,
        messageString: messageString,
        sender: sender
      });

      message.save()
        .then(() => {
          // Emit the message to all clients
          io.emit("message", data);
        })
        .catch((error) => {
          console.error("Error storing message:", error);
        });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  });

  return router;
};

module.exports = websocketRoutes;
