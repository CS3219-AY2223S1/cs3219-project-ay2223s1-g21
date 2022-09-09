import jwt from "jsonwebtoken";

import { createUser, userExistsByEmail, deleteUser, getUserById, updatePassword } from './repository.js';

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

export async function ormLogin(req, id) {
    try {
        //Generate JWT Token
        var token = jwt.sign({ id: id }, process.env.SECRET_AUTH_KEY, {
            expiresIn: 86400, //24 hours
            });

        req.session.token = token;
    } catch (err) {
        console.log('ERROR: Could not login');
        throw err;
    }
}

export async function ormLogout(req) {
    try {
        req.session = null;
    } catch (err) {
        console.log('ERROR: Could not logout');
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
        updatePassword(id, newPassword);       
    } catch (err) {
        console.log('ERROR: Could not change password');
        throw err;
    }
}