const difficulties = require('../constants/Difficulty');

function isValidDifficulty(difficulty) {
    difficulty = difficulty.toLowerCase();

    return (difficulty == difficulties.EASY ||
        difficulty == difficulties.MEDIUM ||
        difficulty == difficulties.HARD);
}

module.exports = {
    isValidDifficulty,
};