import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { createPasswordToken, deletePasswordToken, getPasswordToken } from './passwordToken-repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreatePasswordToken(id) {
    try {
        let token = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(token, parseInt(process.env.SALT_ROUNDS));
    
        const passwordToken = await createPasswordToken({
            userId: id,
            token: hash,
            createdAt: Date.now(),
        });

        passwordToken.save();

        return token;
    } catch (err) {
        console.log('ERROR: Could not create password reset token');
        throw err;
    }
}

export async function ormDeletePasswordToken(id) {
    try {
        deletePasswordToken(id);
    } catch (err) {
        console.log('ERROR: Could not delete password token');
        throw err;
    }
}

export async function ormGetPasswordToken(id) {
    try {
        getPasswordToken(id);
    } catch (err) {
        console.log('ERROR: Could not get password token');
        throw err;
    }
}