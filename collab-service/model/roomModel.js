const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const roomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  partipants: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("roomModel", roomSchema);
