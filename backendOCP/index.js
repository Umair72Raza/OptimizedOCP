const express = require("express");
const app = express();
const mongoose = require("./db/connection");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const LoginApis = require("./routes/User");
const QuesApis = require("./routes/Question");
const QuizApis = require("./routes/Quiz");
const CourseApis = require("./routes/Courses");
const atmptdQuizApis = require("./routes/AttemptedQuiz");
const ChatApis = require("./routes/ChatRoute");
const MessageApis = require("./routes/Messages");
const cors = require("cors");
dotenv.config();

let PORT = 4000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/loginSystem", LoginApis);
app.use("/questionsSystem", QuesApis);
app.use("/quizSystem", QuizApis);
app.use("/courseSystem", CourseApis);
app.use("/atmptQuizSystem", atmptdQuizApis);
app.use("/chatSystem", ChatApis);
app.use("/messageSystem",MessageApis);


app.listen(PORT, "localhost", () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});
