//models how the data in your database should look like
const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
  timeCreated: {
    type: Date,
    expires: 30,
    default: Date.now,
  },
});

const model = mongoose.model("MatchModel", MatchSchema);

module.exports = model;
