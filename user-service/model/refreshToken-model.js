import mongoose from 'mongoose';

const Schema = mongoose.Schema
let RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        unique: false
    },
    expiryDate: Date,
});

export default mongoose.model('RefreshTokenModel', RefreshTokenSchema)
