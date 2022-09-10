import PasswordTokenModel from './passwordToken-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createPasswordToken(params) { 
    return new PasswordTokenModel(params)
}

export async function getPasswordToken(id) {
    return await PasswordTokenModel.findOne({ userId: id });
}

export async function deletePasswordToken(id) {
    return await PasswordTokenModel.deleteOne( {_id: id} );
}