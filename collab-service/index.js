import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import roomModel from "./model/roomModel.js";
import mongoose from "mongoose";
import axios from "axios";
import "dotenv/config";
import { UNAUTHORIZED, verifyToken } from "./utilities/authJwt.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 3005;

const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;

let ATLAS_URI =
  process.env.ENV == "DEV"
    ? process.env.DB_LOCAL_URI
    : `mongodb+srv://username:${PASSWORD}@peerprep-cluster.wcw5ljh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority` ||
      process.env.DB_LOCAL_URI;

const server = app.listen(PORT, async function () {
  try {
    mongoose.connect(
      ATLAS_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );
    console.log("Connected to MongoDB: ", ATLAS_URI);
    console.log(`Collab microservice listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (_, res) => res.send("Hello World from collab service"));
app.get("/MatchingAvaliability", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: `Missing User Id` });
  }
  const userRoom = await roomModel.findOne({ partipants: userId });
  return res.status(200).json({ avaliability: !!!userRoom });
});

const ioSocket = new Server(server, {
  cors: { origin: process.env.CLIENT_DOMAIN },
});

// Socket io method
ioSocket.on("connection", function connection(socket) {
  console.log("User connected: " + socket.id);

  ioSocket.emit("connectionSuccess", "welcome to the backend");

  socket.on("joinRoom", async (data) => {
    console.log("Join Room", data);
    const { roomId, jwtToken, userId } = data;
    const authRes = verifyToken(jwtToken, userId);

    if (authRes.status === UNAUTHORIZED) {
      socket.emit("unauthorized", authRes);
      console.log("Unauthorized", authRes);
      return;
    }

    if (!!!roomId) {
      ioSocket.emit("badRequest");
      return;
    }

    // check if user is already in an room
    const userRoom = await roomModel.findOne({ partipants: socket.id });
    if (userRoom) {
      ioSocket.emit("alreadyInRoom");
      return;
    }

    socket.join(roomId);
    // check if room exist
    const room = await roomModel.findOne({ roomId: roomId });
    if (room) {
      const copy = room.partipants;
      copy.push(socket.id);
      await roomModel.updateOne({ roomId: roomId }, { partipants: copy });
      ioSocket.to(socket.id).emit("joinSuccess");
      if (room.question) {
        ioSocket.to(socket.id).emit("recieveQn", room.question);
      }
    } else {
      const newRoom = new roomModel({
        roomId: roomId,
        partipants: [socket.id],
      });
      await newRoom.save();
      ioSocket.to(socket.id).emit("joinSuccessFirst");
    }
  });

  socket.on("TriggerFetchQn", async (data) => {
    const { roomId, difficulty, jwtToken, userId } = data;
    console.log("Trigger Fetch Question", data);

    const authRes = verifyToken(jwtToken, userId);

    if (authRes.status === UNAUTHORIZED) {
      socket.emit("unauthorized", authRes);
      console.log("Unauthorized", authRes);
      return;
    }

    try {
      const room = await roomModel.findOne({ roomId: roomId });
      const response = await axios.get(
        process.env.REACT_APP_QUESTION_SERVER_URL +
          "/question?difficulty=" +
          difficulty,
        {
          params: { exclude: room.questionIds },
        }
      );

      const question = response.data[0];
      const copy = room.questionIds.length ? room.questionIds : [];
      copy.push(question._id);

      await roomModel.updateOne(
        { roomId: roomId },
        { question: JSON.stringify(question), questionIds: copy }
      );
      ioSocket.to(roomId).emit("recieveQn", JSON.stringify(question));
    } catch (err) {
      console.log("Error with fetching question", err);
      ioSocket.to(roomId).emit("noQnLeft");
    }
  });

  socket.on("startCall", (data) => {
    console.log("start call", data);
    const { peerid, roomId, jwtToken, userId } = data;
    const authRes = verifyToken(jwtToken, userId);

    if (authRes.status === UNAUTHORIZED) {
      socket.emit("unauthorized", authRes);
      console.log("Unauthorized", authRes);
      return;
    }

    ioSocket.to(roomId).emit("callPeer", peerid);
  });

  socket.on("sendChatMsg", (data) => {
    console.log("New Chat Message", data);

    const { roomId, userId, newMessage, jwtToken } = data;
    const authRes = verifyToken(jwtToken, userId);

    if (authRes.status === UNAUTHORIZED) {
      socket.emit("unauthorized", authRes);
      console.log("Unauthorized", authRes);
      return;
    }
    ioSocket.to(roomId).emit("newChatMsg", { userId, newMessage });
  });

  socket.on("exitRoom", async (data) => {
    console.log("Exit Room", data);
    const { roomId, jwtToken, userId } = data;
    const authRes = verifyToken(jwtToken, userId);

    if (authRes.status === UNAUTHORIZED) {
      socket.emit("unauthorized", authRes);
      console.log("Unauthorized", authRes);
      return;
    }

    const room = await roomModel.findOne({ roomId: roomId });

    const copy = room.partipants.filter((x) => x != socket.id);
    if (copy.length) {
      await roomModel.updateOne({ roomId: roomId }, { partipants: copy });
    } else {
      await roomModel.deleteOne({ roomId: roomId });
    }
    ioSocket.to(roomId).emit("leaveRoom");
  });

  socket.on("disconnect", async () => {
    const room = await roomModel.findOne({ partipants: socket.id });

    if (!room) {
      return;
    }

    const copy = room.partipants.filter((x) => x != socket.id);
    if (copy.length) {
      await roomModel.updateOne({ roomId: room.roomId }, { partipants: copy });
    } else {
      await roomModel.deleteOne({ roomId: room.roomId });
    }
  });

  socket.on("CollabTextUpdate", async (data) => {
    console.log("Text Update", data);
    const { roomId, currentCode, jwtToken, userId } = data;
    const authRes = verifyToken(jwtToken, userId);

    if (authRes.status === UNAUTHORIZED) {
      socket.emit("unauthorized", authRes);
      console.log("Unauthorized", authRes);
      return;
    }

    ioSocket.to(roomId).emit("textUpdate", { userId, currentCode });
  });

  socket.on("CollabLangUpdate", async (data) => {
    console.log("Language Update", data);
    const { roomId, lang, jwtToken, userId } = data;
    const authRes = verifyToken(jwtToken, userId);

    if (authRes.status === UNAUTHORIZED) {
      socket.emit("unauthorized", authRes);
      console.log("Unauthorized", authRes);
      return;
    }

    ioSocket.to(roomId).emit("langUpdate", { userId, lang });
  });
});
