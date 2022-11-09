import mongoose from 'mongoose';

const Schema = mongoose.Schema
let QuestionModelSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
        index: true,
    },
    link: {
        type: String,
        required: true,
    },
    instruction: {
        type: String,
        required: true,
    },
    examples: {
        type: Array,
        required: true,
    },
    constraints: {
        type: Array,
        required: true,
    },
    java: {
        type: String,
        required: true,
    },
    javascript: {
        type: String,
        required: true,
    },
    python: {
        type: String,
        required: true,
    }
})

export default mongoose.model('QuestionModel', QuestionModelSchema);
