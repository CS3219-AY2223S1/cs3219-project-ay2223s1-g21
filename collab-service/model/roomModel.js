import mongoose from "mongoose";

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
  question: {
    type: String,
  },
  questionIds: {
    type: Array,
  },
});

export default mongoose.model("roomModel", roomSchema);
