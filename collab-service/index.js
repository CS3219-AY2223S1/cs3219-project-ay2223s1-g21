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

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async function () {
  try {
    mongoose.connect(process.env.DB_LOCAL_URI);
    console.log(`Collab microservice listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

const ioSocket = new Server(server, { cors: { origin: "*" } });

// Socket io method
ioSocket.on("connection", function connection(socket) {
  console.log("User connected: " + socket.id);

  ioSocket.emit("connectionSuccess", "welcome to the backend");

  socket.on("joinRoom", async (data) => {
    const { roomId, userId } = data;

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
      ioSocket.to(socket.id).emit("joinSuccessNew");
    } else {
      ioSocket.to(socket.id).emit("joinSuccess");
    }
  });

  socket.on("startCall", (data) => {
    const { peerid, roomId } = data;
    console.log("start call", data);
    ioSocket.to(roomId).emit("callPeer", peerid);
  });
});
