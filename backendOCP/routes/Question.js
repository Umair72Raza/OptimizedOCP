const express = require("express");
const router = express.Router();
const Qcontroller = require("../controllers/Question");

router.post('/createAQues',Qcontroller.createQ);
router.get('/getQues',Qcontroller.getQ);
router.get('/getQbyQuizId/:quizId',Qcontroller.getQuestionByQuizId);
router.get('/getQbyQuizIdNoOptions/:quizId',Qcontroller.getQuestionByQuizIdnoOptions);
router.put('/updateOptions', Qcontroller.updateOptions);

module.exports = router;