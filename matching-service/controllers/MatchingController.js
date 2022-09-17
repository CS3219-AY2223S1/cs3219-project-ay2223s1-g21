const mongoose = require('mongoose');
const Match = require('../models/Match');
const Interview = require('../models/Interview');
const responseStatus = require('../utilities/constants/ResponseStatus');
const logMsgs = require('../utilities/constants/LogMessages');
const requestHelpers = require('../utilities/helpers/HelperFunctions');
const clientErrMsgs = require('../utilities/errors/ClientError');
const mongoErrMsgs = require('../utilities/errors/MongoError');
const authJwt = require('../utilities/auth/authJwt');

function serviceHealthCheck() {
    var res = { 
        status: responseStatus.SUCCESS, 
        data: {
            message: logMsgs.SERVICE_HEALTHY
        }
    };

    return res;
};

async function searchMatch(socket, io, email, difficulty, jwtToken, id) {
    var authRes = authJwt.verifyToken(jwtToken, id, socket);

    if (authRes.message.includes("Unauthorized")) {
        return;
    }

    if (!requestHelpers.isValidDifficulty(difficulty)) {
        var res = { 
            status: responseStatus.BAD_REQUEST, 
            message: clientErrMsgs.INVALID_DIFFICULTY_ERR
        };

        console.log("Invalid difficulty");
        socket.emit("matchFailed", res);
        return res;
    }

    console.log('Finding match now..')

    try {
        const matchExists = await Match.findOne({ email: email }).exec();
        if (matchExists) {  
            await Match.findOneAndDelete({ email: email }).exec();
        }

        const match = new Match({
            email: email,
            difficulty: difficulty,
        });

        await match.save();
    } catch (err) {
        var res = { 
            status: responseStatus.BAD_REQUEST, 
            message: mongoErrMsgs.readError(err)
        };
    
        socket.emit("matchFailed", res);
        return res;
    }

    var intervalNum = 0;
    const intervalId = setInterval(async () => { //each interval happens every 5000 ms
        intervalNum = intervalNum + 1;
        if (intervalNum > 5) {
            clearInterval(intervalId);
            await Match.findOneAndDelete({ email: email }).exec();
            
            var res = { 
                status: responseStatus.NOT_FOUND, 
                message: clientErrMsgs.TIMEOUT_30_ERR
            };

            socket.emit("matchFailed", res);
            console.log("30 seconds passed, matching failed for user:" + email)
            return res;
        }
        console.log("Retrying find match for user: " + email);

        try {
            const interviewExists = await Interview.findOne({
                $or: [
                    { email1: email },
                    { email2: email }
                ]
            });

            if (interviewExists) {
                // user is already matched with a partner, clear the interval and we are done
                clearInterval(intervalId);
                var partnerEmail = interviewExists.firstEmail;
                if (partnerEmail == email) {
                    partnerEmail = interviewExists.secondEmail;
                }

                var res = {
                    status: responseStatus.SUCCESS,
                    data: {
                        partnerEmail: partnerEmail,
                        interviewId: interviewExists.interviewId,
                        secondsLeft: 3600
                    }
                };

                socket.emit("matchSuccess", res);
                return res;
            }

            //interview does not exist
            const matchRecord = await Match.findOne({ email: email }).exec(); 

            //ensures that Match for this user is registered in Mongo database.
            if (!matchRecord) {
                clearInterval(intervalId);
                var res = { 
                    status: responseStatus.NOT_FOUND, 
                    message: clientErrMsgs.FIND_MATCH_ALR_CANCELLED_ERR
                };

                socket.emit("matchFailed", res);
                return res;
            }

            // if user is not matched with a partner yet, try to find a partner
            const partnerResult = await Match.findOne({
                email: { $ne: email },
                difficulty: difficulty
            }, {}, {
                sort: { "createdAt": 1 }
            }).exec();

            console.log(partnerResult);

            if (!partnerResult) {
                console.log("No partner found for this retry")
                return;
            }

            // match is found
            clearInterval(intervalId);
            console.log("[MS] Match found");

            // Delete both match records
            await Match.findOneAndDelete({ email: email }).exec();
            await Match.findOneAndDelete({ email: partnerResult.email }).exec();

            const interview = new Interview({
                interviewId: mongoose.Types.ObjectId(),
                difficulty: difficulty,
                email1: email,
                email2: partnerResult.email
            });
            await interview.save();

            var res = { 
                status: responseStatus.SUCCESS,
                data: {
                    interviewId: interview.interviewId,
                    partnerEmail: partnerResult.email,
                    difficulty: difficulty,
                    secondsLeft: 3600
                }
            };
            
            socket.emit("matchSuccess", res);
            io.emit("matchSuccess", "success match");
            return res;
        } catch (err) {
            clearInterval(intervalId);
            var res = { 
                status: responseStatus.ERROR, 
                message: mongoErrMsgs.writeError(err)
            };
            socket.emit("matchFailed", res);
            return res;
        }
    }, 5000); 

}

// Get number of current ongoing interviews
async function interviewsCount() {
    try {
        const numInterviews = await Interview.countDocuments({});
        var res = {
            status: responseStatus.SUCCESS,
            data: {
                count: numInterviews
            }
        };
        return res;
    } catch (err) {
        var res = {
            status: responseStatus.ERROR,
            message: mongoErrMsgs.readError(err)
        };
        return res;
    }
}

module.exports = {
    serviceHealthCheck,
    searchMatch,
    interviewsCount
};
