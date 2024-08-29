import express from 'express';
import { enrollCourse, enrolledCourses, getLearners, updateStatus } from '../controllers/enrollmentController.js';
import isAuthenticated from '../middleware/authenticate.js';

const router = express.Router();

router.route("/enroll/:id").get(isAuthenticated, enrollCourse);
router.route("/enrolled").get(isAuthenticated, enrolledCourses);
router.route("/:id/learners").get(isAuthenticated, getLearners);
router.route("/status/:id/update").post(isAuthenticated, updateStatus)

export default router;