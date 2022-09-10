const readError = err => {
    return "MongoDB failed to read: " + err;
}

const writeError = err => {
    return "MongoDB failed to write: " + err;
}

const deleteError = err => {
    return "MongoDB failed to delete: " + err;
}

module.exports = {
    readError,
    writeError,
    deleteError
}