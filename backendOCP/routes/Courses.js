const express = require("express");
const router = express.Router();
const courseController = require('../controllers/Course');

router.get('/getAllTheCourses',courseController.getAllCourses);
router.post('/postACourse',courseController.createACourse);
router.get('/getCoursebyId/:id',courseController.getCourseById)
router.get('/getCoursesofTeacher/:teacherId',courseController.getCourseByTeacherId);
router.post('/checkEnrollment', courseController.checkEnrollment);
router.put('/enroll', courseController.enrollStudentInCourse);
router.delete('/deleteTeacherFromCourse/courseId/:courseId',courseController.delteACourse);
router.get('/getenrolledcourses/:studentId',courseController.getEnrolledCourses);
router.get('/getTeacherByCId/:courseId',courseController.getTeacherByCourseId);
module.exports = router;