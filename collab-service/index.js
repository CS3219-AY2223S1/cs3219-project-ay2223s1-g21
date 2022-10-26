import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import roomModel from "./model/roomModel.js";
import mongoose from "mongoose";
import axios from "axios";
import "dotenv/config";

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
    console.log("Join Room", data);
    const { roomId, userId } = data;

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

    socket.join(roomId);
    // check if room exist
    const room = await roomModel.findOne({ roomId: roomId });
    if (room) {
      const copy = room.partipants;
      copy.push(userId);
      await roomModel.updateOne({ roomId: roomId }, { partipants: copy });
      ioSocket.to(socket.id).emit("joinSuccess");
    } else {
      const newRoom = new roomModel({
        roomId: roomId,
        partipants: [userId],
      });
      await newRoom.save();
      ioSocket.to(socket.id).emit("joinSuccessFirst");
    }
  });

  socket.on("TriggerFetchQn", async (data) => {
    const { roomId, difficulty } = data;
    try {
      const response = await axios.get(
        process.env.REACT_APP_QUESTION_SERVER_URL +
          "/question?difficulty=" +
          difficulty
      );

      const question = response.data[0];
      const room = await roomModel.findOne({ roomId: roomId });
      const copy = room.questionIds.length ? room.questionIds : [];
      copy.push(question._id);

      await roomModel.updateOne({ roomId: roomId }, { questionIds: copy });
      ioSocket.to(roomId).emit("recieveQn", question);
    } catch (err) {
      console.log("Error with fetching question", err.data);
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
