import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: 'True'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'True'
    },
    status: {
        type: String,
        required: true,
        enum: ['Enrolled', 'Not Enrolled'],
        default: 'Not Enrolled'
    }
}, {timestamps: true});

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);