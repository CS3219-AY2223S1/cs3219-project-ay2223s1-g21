import roomModel from "../model/roomModel.js";

export const joinRoom = async (data) => {
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
};

export const checkAvaliability = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: `Missing User Id` });
  }
  const userRoom = await roomModel.findOne({ partipants: userId });
  return res.status(200).json({ avaliability: !!!userRoom });
};
