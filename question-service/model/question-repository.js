import QuestionModel from './question-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';
import mongodb from 'mongodb';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

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