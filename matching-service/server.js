const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const fns = require("./controllers/MatchingController");

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
  })
);

const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const ATLAS_URI = `mongodb+srv://username:${PASSWORD}@peerprep-cluster.wcw5ljh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  || process.env.DB_LOCAL_URI;

const server = app.listen(PORT, function () {
  try {
    mongoose.connect(ATLAS_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"));
    console.log("Connected to MongoDB: ", ATLAS_URI);
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
