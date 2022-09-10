import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '../config/auth-config.js';
import { createToken, getAllToken, deleteToken } from './refreshToken-repository.js';


//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateToken(user) {
    try {
        let expiredAt = new Date();

        expiredAt.setSeconds(
            expiredAt.getSeconds() + authConfig.jwtRefreshExpiration
        );

        const uuid = uuidv4();
        const hash = bcrypt.hashSync(uuid, parseInt(process.env.SALT_ROUNDS));

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
        const tokens = await getAllToken(requestToken);
        let token;
        for (let i = 0; i < tokens.length; i++ ) {
            if (bcrypt.compareSync(requestToken, tokens[i].token)) {
                token = tokens[i];
                break;
            }
        }
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