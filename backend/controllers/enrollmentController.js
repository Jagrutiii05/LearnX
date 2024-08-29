import { Course } from "../models/courseModel.js";
import { Enrollment } from "../models/enrollmentModel.js";

// Enroll for courses
export const enrollCourse = async (req, res) => {
    try {
        const userId = req.id;
        const courseId = req.params.id;
        if(!courseId){
            return res.status(400).json({
                message: "Course ID is required",
                success: false
            });
        };

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({course: courseId, student: userId});
        if(existingEnrollment){
            return res.status(400).json({
                message: "You are already enrolled in this course",
                success: false
            });
        };

        // Check if the course exists
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                message: "Course not found",
                success: false
            });
        };

        // Create a new enrollment
        const newEnrollment = await Enrollment.create({
            course: courseId,
            student: userId,
            status: "Verifying Payment"
        });

        course.enrollments.push(newEnrollment._id);
        await course.save();

        return res.status(201).json({
            message: "Enrolled successfully",
            newEnrollment,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

// Get enrolled courses
export const enrolledCourses = async (req, res) => {
    try {
        const userId = req.id;
        const enrollments = await Enrollment.find({student: userId}).populate({
            path: "course",
            options: {sort: {createdAt: -1}},
            populate: {
                path: "instructor"
            }
        });

        if(!enrollments){
            return res.status(400).json({
                message: "No courses found",
                success: false
            });
        };

        return res.status(200).json({
            enrollments,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// Get learners - for instructors
export const getLearners = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId).populate({
            path: "enrollments",
            options: {sort: {createdAt: -1}},
            populate: {
                path: "student"
            }
        });
        if(!course){
            return res.status(400).json({
                message: "Course not found",
                success: false
            });
        }

        return res.status(200).json({
            course,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// Update enrollment status
export const updateStatus = async (req, res) => {
    try {
        const enrollmentId = req.params.id;
        const status = req.body.status;
        if(!status){
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        };

        const enrollment = await Enrollment.findOne({_id:enrollmentId});
        if(!enrollment){
            return res.status(400).json({
                message: "Enrollment not found",
                success: false
            });
        };

        // Update the status
        enrollment.status = status;
        await enrollment.save();
        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}