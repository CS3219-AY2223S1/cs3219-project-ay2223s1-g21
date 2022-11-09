const mongoose = require("mongoose");
const Match = require("../models/Match");
const Interview = require("../models/Interview");
const responseStatus = require("../utilities/constants/ResponseStatus");
const logMsgs = require("../utilities/constants/LogMessages");
const requestHelpers = require("../utilities/helpers/HelperFunctions");
const clientErrMsgs = require("../utilities/errors/ClientError");
const mongoErrMsgs = require("../utilities/errors/MongoError");
const authJwt = require("../utilities/auth/authJwt");
const moment = require("moment");

function serviceHealthCheck() {
  var res = {
    status: responseStatus.SUCCESS,
    data: {
      message: logMsgs.SERVICE_HEALTHY,
    },
  };
  return res;
}

async function searchMatch(socket, io, email, difficulty, jwtToken, userId) {
  var authRes = authJwt.verifyToken(jwtToken, userId, socket);

  // Not authorised
  if (authRes.status === responseStatus.UNAUTHORIZED) {
    socket.emit("unauthorized", authRes);
    console.log("Unauthorized", authRes);
    return;
  }

  // Authorised
  if (!requestHelpers.isValidDifficulty(difficulty)) {
    var res = {
      status: responseStatus.BAD_REQUEST,
      message: clientErrMsgs.INVALID_DIFFICULTY_ERR,
    };
    socket.emit("badRequest", res);
    console.log(message);
    return;
  }

  // Check if this user has already request pending
  // Mongo Timing of the Delete Operation is every 60 secs
  const dupRequest = await Match.findOne({ email: email });
  if (
    dupRequest &&
    moment().diff(moment(dupRequest.timeCreated), "seconds") < 30
  ) {
    var res = {
      status: responseStatus.BAD_REQUEST,
      message: clientErrMsgs.DUPLICATED_REQUEST_ERR,
    };
    socket.emit("badRequest", res);
    return;
  }

  // Check if there is an existing match waiting
  const matchExists = await Match.findOne({ difficulty: difficulty });
  if (
    !matchExists ||
    moment().diff(moment(matchExists.timeCreated), "seconds") >= 30
  ) {
    if (matchExists) {
      console.log(
        "There is another match but expired , not deleted yet",
        moment().diff(moment(matchExists.timeCreated), "seconds")
      );
    }
    const match = new Match({
      email: email,
      difficulty: difficulty,
      socketId: socket.id,
    });

    await match.save();
    return;
  }

  await Match.findOneAndDelete({ email: email, difficulty: difficulty });
  await Match.findOneAndDelete({
    email: matchExists.email,
    difficulty: difficulty,
  });

  const interview = new Interview({
    interviewId: mongoose.Types.ObjectId(),
    difficulty: difficulty,
    email1: email,
    email2: matchExists.email,
  });
  await interview.save();

  var res = {
    status: responseStatus.SUCCESS,
    data: {
      interviewId: interview.interviewId,
      partnerEmail: matchExists.email,
      difficulty: difficulty,
    },
  };

  io.to(matchExists.socketId).emit("matchSuccess", res);
  socket.emit("matchSuccess", res);
}

async function cancelMatch(socketId) {
  await Match.deleteOne({
    socketId: socketId,
  });
}

module.exports = {
  serviceHealthCheck,
  searchMatch,
  cancelMatch,
};
