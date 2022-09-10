import { deleteToken } from './refreshToken-repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormDeleteToken(refreshToken) {
    try {
        deleteToken(refreshToken);
    } catch (err) {
        console.log('ERROR: Could not delete token');
        throw err;
    }
}