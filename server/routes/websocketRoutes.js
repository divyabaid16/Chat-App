const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const Group = require("../models/Group");

const websocketRoutes = (io) => {
  io.on("connection", async (socket) => {

    socket.on("joinRoom", async (groupId) => {
      const group = await Group.findById(groupId);
      if (group) {
        socket.join(groupId);
      }
    });

    socket.on("message", async (data) => {
      const { groupId, messageString, sender } = data;

      try {
        const message = new Message({
          group: groupId,
          messageString: messageString,
          sender: sender
        });

        await message.save()
        const senderDetails = await User.findById(sender);
        const username = senderDetails ? senderDetails.username : 'Unknown';

        // socket.join(groupId);
        io.to(groupId).emit("message", { ...data, username });

        // io.emit("message", { ...data, username });

        console.log("Message stored and broadcasted successfully");
      } catch (error) {
        console.error("Error storing message:", error);
      };
    });

    socket.on("userTyping", async ({ groupId, userId, isTyping }) => {
      try {
        const user = await User.findById(userId);
        const username = user ? user.username : 'Unknown';
        io.to(groupId).emit("userTyping", { userId, username, isTyping });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return router;
};

module.exports = websocketRoutes;
