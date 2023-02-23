import { Schema, model } from 'mongoose';

// Schema
const problemSchema = new Schema({
    title: {
        type: String,
    },
    problem: {
        type: String
    },
    difficulty: {
        type:String,
    },
    input: {
        type: String
    },
    output_format: {
        type: String
    },
    testcases: {
        type: String
    },
    output: {
        type: String
    }
})

// model
const Problem = model('problem', problemSchema);  //collection will be created as 'users'

export default Problem;