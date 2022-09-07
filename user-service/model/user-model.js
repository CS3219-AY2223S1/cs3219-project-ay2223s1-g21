import mongoose from 'mongoose';
var Schema = mongoose.Schema
let UserModelSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

export default mongoose.model('UserModel', UserModelSchema)
