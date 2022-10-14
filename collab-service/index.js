// import express from "express";
// import cors from "cors";
// import { WebSocketServer } from "ws";
// import sharedb from "sharedb";
// import { Server } from "socket.io";
// import roomModel from "./model/roomModel.js";
// import { config } from "dotenv";
// import type from "rich-text";
// import { joinRoom } from "./controller/index.js";
// import WebSocketJSONStream from "@teamwork/websocket-json-stream";
const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const sharedb = require("sharedb");
const { Server } = require("socket.io");
const roomModel = require("./model/roomModel.js");
const richText = require("rich-text");
const { joinRoom } = require("./controller/index.js");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");

config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async function () {
  try {
    console.log(`Collab microservice listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

sharedb.types.register(richText.type);
const ioSocket = new Server(server, { cors: { origin: "*" } });
// const shareDBSocketServer = new WebSocketServer({ server: server });
// const sharedDb = new sharedb();
// const connection = sharedDb.connect();

// shareDBSocketServer.on("connection", (ws) => {
//   console.log("TEST");
//   const jsonStream = new WebSocketJSONStream(ws);
//   sharedDb.listen(jsonStream);
// });

// Socket io method
ioSocket.on("connection", function connection(socket, data) {
  console.log("User connected: " + socket.id);

  ioSocket.emit("connectionSuccess", "welcome to the backend");

  socket.on("joinRoom", (data) => {
    console.log(data);
    socket.join(data);
    ioSocket.to(socket.id).emit("joinSuccess");
  });

  socket.on("sendTextUpdate", (data) => {
    const { text, roomId } = data;
    ioSocket.to(roomId).emit("textUpdate", text);
  });

  // ... do other service stuff with socket.io
});
