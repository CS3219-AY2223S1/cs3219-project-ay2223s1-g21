const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const fns = require("./controllers/MatchingController");

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
  })
);

const server = app.listen(PORT, function () {
  try {
    mongoose.connect("mongodb://localhost:27017/match-mongodb");
    console.log("Connected to MongoDB");
    console.log(`Match microservice listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", function (socket) {
  console.log("User connected: " + socket.id);
  io.emit("connectionSuccess", "welcome to the backend");

  socket.on("checkHealth", () => {
    socket.emit("healthStatus", fns.serviceHealthCheck());
  });

  socket.on("findMatch", async (data) => {
    console.log("Find Match");
    try {
      await fns.searchMatch(
        socket,
        io,
        data.email,
        data.difficulty,
        data.jwtToken,
        data.userId
      );
    } catch (error) {
      console.error("server err", error);
    }
  });

  socket.on("cancelMatch", async (data) => {
    console.log("Cancel Match");
    try {
      await fns.cancelMatch(
        socket,
        data.email,
        data.difficulty,
        data.jwtToken,
        data.userId
      );
    } catch (error) {
      console.error("server err", error);
    }
  });
});
