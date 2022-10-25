import PasswordTokenModel from './passwordToken-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

// let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
const PASSWORD = process.env.PASSWORD
const DB_NAME = process.env.DB_NAME
const ATLAS_URI = `mongodb+srv://username:${PASSWORD}@peerprep-cluster.wcw5ljh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    || process.env.DB_LOCAL_URI;

mongoose.connect(ATLAS_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log(" Mongoose is connected"));
    
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