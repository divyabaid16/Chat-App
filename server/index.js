const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIo = require('socket.io');

const app = express();
require("dotenv").config();

const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');
const websocketRoutes = require('./routes/websocketRoutes');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connection Successful")
}).catch((error) => {
  console.log("Error", error.message);
})

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/websocket', websocketRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on PORT ${process.env.PORT}`);
})

const io = socketIo(server, {
  cors: {
    origin: "http://192.168.8.47:3000",
    methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});
app.use("/api/websocket", websocketRoutes(io));
