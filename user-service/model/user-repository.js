import UserModel from './user-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

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