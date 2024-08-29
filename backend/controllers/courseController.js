import { Course } from "../models/courseModel.js";


// Create Course - for instructors
export const postCourse = async (req, res) => {
    try {
        const { title, description, pre_requisites, skills_gain, duration_in_weeks, instructor, pricing, rating } = req.body;
        const courseId = req.id;
        if(!title || !description || !pre_requisites || !skills_gain || !duration_in_weeks || !instructor || !pricing || !rating){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const newCourse = await Course.create({
            title,
            description,
            pre_requisites: pre_requisites.split(", "),
            skills_gain,
            duration_in_weeks,
            instructor,
            pricing,
            rating
        })

        return res.status(201).json({
            message: "Course created successfully",
            newCourse,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

// Get all Courses - for students
export const getCourses = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        };
        const courses = await Course.find(query).populate({
            path: "instructor",
        });
        if(!courses){
            return res.status(404).json({
                message: "No courses found",
                success: false
            })
        };
        return res.status(200).json({
            courses,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get single Course - for students
export const getCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message: "Course not found",
                success: false
            })
        };
        return res.status(200).json({
            course,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}
// get courses by instructors
export const getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.id;
        const courses = await Course.find({instructor: instructorId}).populate({
            path: "instructor",
        });
        if(!courses){
            return res.status(404).json({
                message: "No courses found",
                success: false
            })
        };
        return res.status(200).json({
            courses,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}