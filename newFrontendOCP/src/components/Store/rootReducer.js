import { combineReducers } from "@reduxjs/toolkit";
import QuestionReducer from "./QuestionReducer";
import QuizReducer from "./QuizReducer";
import authReducer from "./authSlice"
const rootReducer = combineReducers(
    {
        question:QuestionReducer,
        quiz:QuizReducer,
        auth: authReducer
    }
)
export default rootReducer