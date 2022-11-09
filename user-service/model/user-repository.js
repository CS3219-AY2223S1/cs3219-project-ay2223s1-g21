import UserModel from './user-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

//let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME;
let ATLAS_URI = process.env.ENV == "DEV" ? process.env.DB_LOCAL_URI :
    `mongodb+srv://username:${PASSWORD}@peerprep-cluster.wcw5ljh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    || process.env.DB_LOCAL_URI;

mongoose.connect(ATLAS_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => console.log(" Mongoose is connected"));
    
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) { 
    return new UserModel(params)
}

export async function getUserByEmail(email) {
    return await UserModel.findOne({ email: email });
}

export async function getUserById(id) {
    return await UserModel.findOne({ _id: id });
}

export async function userExistsByEmail(email) {
    let user = await UserModel.findOne({ email: email });
    return user != null;
}

export async function userExistsById(id) {
    let user = await UserModel.findOne({ _id: id });
    return user != null;
}

export async function deleteUser(id) {
    await UserModel.deleteOne({ _id: id });
}

export async function updatePassword(id, newPassword) {
    await UserModel.updateOne({ _id: id }, {password: newPassword});
}

export async function getHistory(id) {
    let user = await UserModel.findOne({ _id: id });
    return user.history;
}

export async function updateHistory(id, history) {
    let user = await UserModel.findOne({ _id: id });
    let hist = user.history;
    hist.push(history);
    await UserModel.updateOne({ _id: id }, {history: hist});
}