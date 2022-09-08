import { 
    ormCreateUser as _createUser, 
    ormLogin as _login, 
    ormLogout as _logout, 
    ormDeleteUser as _deleteUser } 
    from '../model/user-orm.js'
import { getUser, userExists } from '../model/repository.js';

export async function createUser(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
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
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await getUser(email);

        //User does not exist
        if (!await userExists(email)) {
            return res.status(404).json({ message: "User Not found!" });
        }

        //Invalid password
        if (password != user.password) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        await _login(req, user.id);
        console.log("Login successful!");
        return res.status(200).json({ id: user._id, email: email, message: "Login successful!" });
    } catch (err) {
        return res.status(500).json({ message: `Login failure. Error: ${err}` });
    }
}
  
export async function logout(req, res) {
    try {
        await _logout(req);
        console.log("Logout successful!");
        return res.status(200).json({ message: "Signed out succesfull!" });
    } catch (err) {
        return res.status(500).json({ message: `Logout failure. Error: ${err}` });
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.session.token.id;
        console.log(id);

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