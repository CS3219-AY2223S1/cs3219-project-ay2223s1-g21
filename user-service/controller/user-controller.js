import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { 
    ormCreateUser as _createUser,
    ormDeleteUser as _deleteUser,
    ormChangePassword as _changePassword } 
    from '../model/user-orm.js'
import { ormDeleteToken as _deleteToken } from '../model/refreshToken-orm.js'
import { getUserByEmail, getUserById, userExistsByEmail, userExistsById } from '../model/user-repository.js';
import { getToken } from '../model/refreshToken-repository.js';
import authConfig from '../config/auth-config.js';
import RefreshTokenModel from '../model/refreshToken-model.js';

export async function createUser(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
            const resp = await _createUser(email, hash);
            
            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new user!'});
            } 
            
            if (resp) {
                console.log(`Created new user ${email} successfully!`)
                return res.status(201).json({message: `Created new user ${email} successfully!`});
            } else {
                console.log(`Email ${email} already exist!`)
                return res.status(400).json({message: `Email ${email} already exist! Please choose a different email!`});
            }
        } else {
            return res.status(400).json({message: 'Email and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: `Database failure when creating new user! Error: ${err}`})
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        //User does not exist
        if (!await userExistsByEmail(email)) {
            return res.status(404).json({ message: "User Not found!" });
        }

        //Invalid password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        //Generate JWT Token
        var token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.jwtExpiration
        });

        let refreshToken = await RefreshTokenModel.createToken(user);

        req.session.refreshToken = refreshToken;
        console.log("Login successful!");
        return res.status(200).json({ id: user._id, email: email, token: token, message: "Login successful!" });
    } catch (err) {
        return res.status(500).json({ message: `Login failure. Error: ${err}` });
    }
}

export async function refreshToken(req, res) {
    const requestToken = req.session.refreshToken;
  
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await getToken(requestToken);
  
        if (!refreshToken) {
            return res.status(403).json({ message: "Refresh token does not exist in database!" });
        }
  
        if (RefreshTokenModel.verifyExpiration(refreshToken)) {
            _deleteToken(refreshToken);

            return res.status(403).json({ message: "Refresh token expired. Please login again" });
        }
  
        const newAccessToken = jwt.sign({ id: refreshToken.user._id }, authConfig.secret, {
            expiresIn: authConfig.jwtExpiration,
        });
  
        console.log("Access token generated successfully!");
        return res.status(200).json({ token: newAccessToken, message: "Access token generated successfully!" });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
  
export async function logout(req, res) {
    try {
        req.session = null;
        console.log("Logout successful!");
        return res.status(200).json({ message: "Signed out succesfull!" });
    } catch (err) {
        return res.status(500).json({ message: `Logout failure. Error: ${err}` });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.body;

        if (id == null) {
            return res.status(400).json({ message: "User does not exist!" });    
        }

        await _deleteUser(id);
        console.log("Delete user successful!");
        return res.status(200).json({ message: "Deleted user successfully!" });
    } catch (err) {
        return res.status(500).json({ message: `Delete user failure. Error: ${err}` });
    }
}

export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword, reNewPassword, id } = req.body;

        const user = await getUserById(id);

        //User does not exist
        if (!await userExistsById(id)) {
            return res.status(404).json({ message: "User Not found!" });
        }

        //Different password 
        if (newPassword != reNewPassword) {
            return res.status(401).json({ message: "Password do not match!" });
        }

        //Invalid password
        if (!bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        //New password identical to current
        if (currentPassword == newPassword) {
            return res.status(401).json({ message: "Current and new password are identical!" });
        }

        const hash = bcrypt.hashSync(newPassword, parseInt(process.env.SALT_ROUNDS));

        await _changePassword(id, hash);
        console.log("Password changed successfully!");
        return res.status(200).json({ message: "Password changed successfully!" });
    } catch (err) {
        return res.status(500).json({ message: `Password change failure. Error: ${err}` });
    }
}