import { Schema, model } from 'mongoose';

// Schema
const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    },
    points: {
        type: Number,
    }
})

// model
const User = model('user', userSchema);  //collection will be created as 'users'

export default User;