const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const roomModel = require("./model/roomModel");
const mongoose = require("mongoose");

config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 3005;

const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const ATLAS_URI = `mongodb+srv://username:${PASSWORD}@peerprep-cluster.wcw5ljh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority` 
  || process.env.DB_LOCAL_URI;

const server = app.listen(PORT, async function () {
  try {
    mongoose.connect(ATLAS_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"));
    console.log("Connected to MongoDB: ", ATLAS_URI);
    console.log(`Collab microservice listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

const ioSocket = new Server(server, { cors: { origin: process.env.CLIENT_DOMAIN } });

// Socket io method
ioSocket.on("connection", function connection(socket) {
  console.log("User connected: " + socket.id);

  ioSocket.emit("connectionSuccess", "welcome to the backend");

  socket.on("joinRoom", async (data) => {
    const { roomId, userId } = data;

    console.log(roomId, !!!roomId);

    if (!!!roomId) {
      ioSocket.emit("badRequest");
      return;
    }

    // check if user is already in an room
    const userRoom = await roomModel.findOne({ partipants: userId });
    if (userRoom) {
      ioSocket.emit("alreadyInRoom");
      return;
    }

    // check if room exist
    const room = await roomModel.findOne({ roomId: roomId });
    if (room) {
      const copy = room.partipants;
      copy.push(userId);
      await roomModel.updateOne({ roomId: roomId }, { partipants: copy });
    } else {
      const newRoom = new roomModel({
        roomId: roomId,
        partipants: [userId],
      });
      await newRoom.save();
    }
    socket.join(roomId);
    if (room) {
      ioSocket.to(socket.id).emit("joinSuccess");
    } else {
      ioSocket.to(socket.id).emit("joinSuccessNew");
    }
  });

  socket.on("startCall", (data) => {
    const { peerid, roomId } = data;
    console.log("start call", data);
    ioSocket.to(roomId).emit("callPeer", peerid);
  });

  socket.on("sendChatMsg", (data) => {
    const { roomId, userId, newMessage } = data;
    console.log("New Chat Message", data);
    ioSocket.to(roomId).emit("newChatMsg", { userId, newMessage });
  });

  socket.on("exitRoom", async (data) => {
    const { roomId } = data;
    await roomModel.findOneAndDelete({ roomId: roomId });
    ioSocket.to(roomId).emit("leaveRoom");
  });
});
