import bcrypt from 'bcrypt';

import { createUser, userExistsByEmail, deleteUser, updatePassword, getUserByEmail, getUserById, userExistsById } from './user-repository.js';

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

export async function ormGetUserByEmail(email) {
    try {
        return await getUserByEmail(email);
    } catch (err) {
        console.log('ERROR: Could not get user by email');
        throw err;
    }
}

export async function ormGetUserById(id) {
    try {
        return await getUserById(id);
    } catch (err) {
        console.log('ERROR: Could not get user by id');
        throw err;
    }
}

export async function ormUserExistsByEmail(email) {
    try {
        return await userExistsByEmail(email);
    } catch (err) {
        console.log('ERROR: Could not dcheck if user exists by email');
        throw err;
    }
}

export async function ormUserExistsById(id) {
    try {
        return await userExistsById(id);
    } catch (err) {
        console.log('ERROR: Could not check if user exists by id');
        throw err;
    }
}