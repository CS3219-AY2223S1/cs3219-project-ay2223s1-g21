import bcrypt from 'bcrypt';

import { createUser, userExistsByEmail, deleteUser, updatePassword } from './user-repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(email, password) {
    try {
        //check unique user
        if (await userExistsByEmail(email)) {
            return false;
        }

        const newUser = await createUser({email, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        throw err;
    }
}

export async function ormDeleteUser(id) {
    try {
        deleteUser(id);
    } catch (err) {
        console.log('ERROR: Could not delete user');
        throw err;
    }
}

export async function ormChangePassword(id, newPassword) {
    try {
        const hash = bcrypt.hashSync(newPassword, parseInt(process.env.SALT_ROUNDS));
        updatePassword(id, hash);       
    } catch (err) {
        console.log('ERROR: Could not change password');
        throw err;
    }
}