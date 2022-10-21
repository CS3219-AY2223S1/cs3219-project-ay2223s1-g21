import {sha512} from 'crypto-hash';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '../config/auth-config.js';
import { createToken, deleteToken, getToken } from './refreshToken-repository.js';


//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateToken(user) {
    try {
        let expiredAt = new Date();

        expiredAt.setSeconds(
            expiredAt.getSeconds() + authConfig.jwtRefreshExpiration
        );

        const uuid = uuidv4();
        const hash = await sha512(uuid);

        const token = await createToken({
            token: hash,
            user: user._id,
            email: user.email,
            expiryDate: expiredAt.getTime(),
        });
        console.log(token);

        await token.save();

        return uuid;
    } catch (err) {
        console.log('ERROR: Could not create token');
        throw err;
    }
};

export async function ormGetToken(requestToken) {
    try {
        const hash = await sha512(requestToken);
        const token = getToken(hash);
        return token;
    } catch (err) {
        console.log('ERROR: Could not get token');
        throw err;
    }
}

export async function ormDeleteToken(refreshToken) {
    try {
        deleteToken(refreshToken);
    } catch (err) {
        console.log('ERROR: Could not delete token');
        throw err;
    }
}