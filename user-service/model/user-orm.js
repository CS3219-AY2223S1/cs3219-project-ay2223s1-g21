import { createUser, userExists } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(email, password) {
    try {
        //check unique user
        if (await userExists(email)) {
            return false;
        }

        const newUser = await createUser({email, password});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

