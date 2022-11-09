import mongoose from 'mongoose';

const Schema = mongoose.Schema
let RefreshTokenSchema = new Schema({
    token: {
        type: String,
        unique: true,
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
    expiryDate: {
        type: Date,
    },
});

RefreshTokenSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 1 });

export default mongoose.model('RefreshTokenModel', RefreshTokenSchema)
