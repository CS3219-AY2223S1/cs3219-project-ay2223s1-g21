import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '../config/auth-config.js';

var Schema = mongoose.Schema
let RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
    },
    expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(
        expiredAt.getSeconds() + authConfig.jwtRefreshExpiration
    );

    let _object = new this({
        token: uuidv4(),
        user: user._id,
        expiryDate: expiredAt.getTime(),
    });

    console.log(_object);

    let refreshToken = await _object.save();

    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
}

export default mongoose.model('RefreshTokenModel', RefreshTokenSchema)
