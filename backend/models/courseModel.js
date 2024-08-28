import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    pre_requisites: {
        type: String
    },
    skills_gain: {
        type: String,
        required: true
    },
    duration_in_weeks: {
        type: Number,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    pricing: {
        type: Number,
        required: true
    },
    rating: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    enrollment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment'
    }
}, {timestamps: true});

export const Course = mongoose.model("Course", courseSchema);