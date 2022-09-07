const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    interviewId: {
        type: String,
        required: true,
        unique: true
    },
    difficulty: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    username1: {
        type: String
    },
    username2: {
        type: String
    },
    timeCreated: {
        type: Date,
        expires: 3600,
        default: Date.now
    }
});

const Interview = mongoose.model('InterviewModel', interviewSchema);

module.exports = Interview;