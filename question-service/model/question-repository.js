import QuestionModel from './question-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';
import mongodb from 'mongodb';

const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
const ATLAS_URI = `mongodb+srv://username:${PASSWORD}@peerprep-cluster.wcw5ljh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    || process.env.DB_LOCAL_URI;

console.log(ATLAS_URI);

mongoose.connect(ATLAS_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log(" Mongoose is connected"));

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function getRandomQuestionByDifficulty(difficulty, exclude) {

    var ids = exclude.map(function (id) {return mongodb.ObjectId(id)});

    return await QuestionModel.aggregate([
        { $match: { difficulty: difficulty } },
        { $match: { _id: {$nin : ids }}},
        { $sample: { size: 1 } }
    ]);
}