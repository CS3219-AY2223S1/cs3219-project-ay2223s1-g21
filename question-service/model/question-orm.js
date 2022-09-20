import { getRandomQuestionByDifficulty } from './question-repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormGetRandomQuestion(difficulty) {
    try {
        const question = await getRandomQuestionByDifficulty(difficulty);
        
        if (question.length == 0) {
            throw "No question found";
        }

        return question;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        throw err;
    }
}