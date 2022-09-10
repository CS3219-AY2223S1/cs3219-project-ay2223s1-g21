import RefreshTokenModel from './refreshToken-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function getToken(requestToken) {
    return await RefreshTokenModel.findOne({ token: requestToken });
}

export async function deleteToken(refreshToken) {
    return await RefreshTokenModel.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
}
