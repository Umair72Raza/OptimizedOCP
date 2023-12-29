const express = require("express");
const router = express.Router();

const quizController = require('../controllers/Quiz');

router.post('/addQuiz',quizController.creatQuiz);
router.get('/getQuizzes',quizController.getQuizzes);
router.get('/getQuizesbyCourseId/:courseId',quizController.quizByCourseId);

module.exports = router;