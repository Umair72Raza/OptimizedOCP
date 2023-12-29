const express = require("express");
const router = express.Router();
const atmptdQuizController = require("../controllers/AttemptedQuiz");
const { route } = require("./Question");

router.post('/postQuizResult',atmptdQuizController.postAttemptedQuiz);
router.get('/getAttemptedQuizzes/:studentId/:courseId',atmptdQuizController.getAttemptedQuiz);
router.get('/getCorrectOption/:courseId/:quizId',atmptdQuizController.correctOptionsWithQuizId);
router.delete('/delattemptedQuizzes', atmptdQuizController.deleteAllAttemptedQuizzes);
router.get('/getatmptQuizofCourse/:courseId',atmptdQuizController.getAttemptedQuizByCourseId);

module.exports = router;