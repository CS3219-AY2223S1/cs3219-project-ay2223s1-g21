import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { 
    ormCreateUser as _createUser,
    ormDeleteUser as _deleteUser,
    ormChangePassword as _changePassword,
    ormGetUserByEmail as _getUserByEmail,
    ormGetUserById as _getUserById,
    ormUserExistsByEmail as _userExistsByEmail,
    ormUserExistsById as _userExistsById } 
    from '../model/user-orm.js'
import { 
    ormCreateToken as _createToken, 
    ormGetToken as _getToken, 
    ormDeleteToken as _deleteToken } 
    from '../model/refreshToken-orm.js'
import { ormCreatePasswordToken as _createPasswordToken, ormDeletePasswordToken as _deletePasswordToken, ormGetPasswordToken as _getPasswordToken } from '../model/passwordToken-orm.js';
import authConfig from '../config/auth-config.js';
import passwordRegex from "../util/password-regex.js";
import CONSTANTS from "../util/constants.js";
import { sendEmail } from "../util/email/sendEmail.js";

export async function createUser(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            
            if (!password.match(passwordRegex)) {
                return res.status(400).json({message: CONSTANTS.INVALID_PASSWORD_MESSAGE});
            }
            
            const resp = await _createUser(email, password);
            
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
        const user = await _getUserByEmail(email);

        //User does not exist
        if (!await _userExistsByEmail(email)) {
            return res.status(404).json({ message: "User Not found! Please try again." });
        }

        //Invalid password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid password! Please try again." });
        }

        //Generate JWT Token
        var token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.jwtExpiration
        });

        const refreshToken = await _createToken(user);

        req.session.refreshToken = refreshToken;
        console.log("Login successful!");
        return res.status(200).json({ id: user._id, email: email, token: token, message: "Login successful!" });
    } catch (err) {
        return res.status(500).json({ message: `Login failed. Error: ${err}` });
    }
}

export async function refreshToken(req, res) {
    const requestToken = req.session.refreshToken;
    
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await _getToken(requestToken);

        if (!refreshToken) {
            return res.status(403).json({ message: "Refresh token does not exist in database!" });
        }

        if (refreshToken.expiryDate.getTime() < new Date().getTime()) {
            _deleteToken(refreshToken);

            return res.status(403).json({ message: "Refresh token expired. Please login again" });
        }
  
        const newAccessToken = jwt.sign({ id: refreshToken.user }, authConfig.secret, {
            expiresIn: authConfig.jwtExpiration,
        });
  
        console.log("Access token generated successfully!");
        return res.status(200).json({ id: refreshToken.user, email: refreshToken.email, token: newAccessToken, message: "Access token generated successfully!" });
    } catch (err) {
        return res.status(500).send({ message: `Refresh token failed. Error: ${err}` });
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
        req.session = null;
        console.log("Delete user successful!");
        return res.status(200).json({ message: "Deleted user successfully!" });
    } catch (err) {
        return res.status(500).json({ message: `Delete user failed. Error: ${err}` });
    }
}

export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword, reNewPassword, id } = req.body;

        const user = await _getUserById(id);

        //User does not exist
        if (!await _userExistsById(id)) {
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

        //Does not match password criteria
        if (!newPassword.match(passwordRegex)) {
            return res.status(400).json({message: CONSTANTS.INVALID_PASSWORD_MESSAGE});
        }

        await _changePassword(id, newPassword);
        console.log("Password changed successfully!");
        return res.status(200).json({ message: "Password changed successfully!" });
    } catch (err) {
        return res.status(500).json({ message: `Password change failed. Error: ${err}` });
    }
}

export async function requestPasswordReset(req, res) {
    try {
        const { email } = req.body;
        const user = await _getUserByEmail(email);

        //User does not exist
        if (!await _userExistsByEmail(email)) {
            return res.status(404).json({ message: "User Not found!" });
        }

        let token = await _getPasswordToken(user._id);
        
        //If token exist, delete it
        if (token) {
            await _deletePasswordToken(token);
        }
    
        const resetToken = await _createPasswordToken(user._id);
    
        const link = `${process.env.CLIENT_DOMAIN}/passwordReset?token=${resetToken}&id=${user._id}`;
    
        sendEmail(
            user.email,
            "Reset Password Request",
            {
                email: user.email,
                link: link,
            },
            "./requestResetPassword.handlebars"
        );
        return res.status(200).json({ message: "Check your email for instructions to reset your password!" });
    } catch (err) {
        return res.status(500).json({ message: `Request Password Reset failed. Error: ${err}` });
    }
};
  
export async function resetPassword(req, res) {
    try {
        const { userId, token, password } = req.body;

        let resetToken = await _getPasswordToken(userId);
    
        //Reset password token does not exist
        if (!resetToken) {
            return res.status(404).json({ message: "Password reset token not found!" });
        }

        //Invalid reset password token
        if (!bcrypt.compareSync(token, resetToken.token)) {
            return res.status(401).json({ message: "Invalid or expired reset password token!" })
        }
    
        //Does not match password criteria
        if (!password.match(passwordRegex)) {
            return res.status(400).json({message: CONSTANTS.INVALID_PASSWORD_MESSAGE});
        }

        await _changePassword(userId, password)
    
        const user = _getUserById(userId);
    
        sendEmail(
            user.email,
            "Password Reset Successfully",
            {
            email: user.email,
            },
            "./resetPassword.handlebars"
        );
    
        await _deletePasswordToken(token._id);

        return res.status(200).json({ message: "Password reset successfully! Please login with your new password." });
    } catch (err) {
        return res.status(500).json({ message: `Reset Password failed. Error: ${err}` });
    }
};