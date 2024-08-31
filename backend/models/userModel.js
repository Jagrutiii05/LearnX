import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Learner', 'Instructor']
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}]
    }
}, {timeStamp: true});

export const User = mongoose.model('User', userSchema);