import express from 'express';
import { getCourse, getCourses, getInstructorCourses, postCourse } from '../controllers/courseController.js';
import isAuthenticated from '../middleware/authenticate.js';

const router = express.Router();

router.route("/create").post(isAuthenticated, postCourse);
router.route("/get/courses").get(isAuthenticated, getCourses);
router.route("/get/course/:id").get(isAuthenticated, getCourse);
router.route("/mycourses").get(isAuthenticated, getInstructorCourses);

export default router;