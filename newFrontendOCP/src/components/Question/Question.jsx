/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { postQuestion } from "../Store/QuestionReducer";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import DefaultLayout from "../Layouts/DefaultLayout";

const Question = (props) => {
  // const [updateFlag,setUpdateFlag] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const Qid = location.state?.Quizid;

  const { question } = props;
  const { allSelectedOptions } = props;
  const { update } = props;
  //console.log("update props", update)
  // update ? setUpdateFlag(true):setUpdateFlag(false);
  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] = useState({
    statement: "",
    quizId: Qid,
    options: [""],
    correctOption: "",
    ...props, // Preserve existing properties from the question prop
  });

  const addOption = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, ""],
    }));
  };

  const removeOption = (index) => {
    setCurrentQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion.options];
      updatedOptions.splice(index, 1);
      return {
        ...prevQuestion,
        options: updatedOptions,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postQuestion(currentQuestion));
    setCurrentQuestion({
      statement: "",
      quizId: Qid,
      options: [""],
      correctOption: "",
    });
  };

  const updateOption = (index, value) => {
    setCurrentQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion.options];
      updatedOptions[index] = value;
      return {
        ...prevQuestion,
        options: updatedOptions,
      };
    });
  };
  const handleFinish = (e) => {
    e.preventDefault();
    navigate("/Teacher");
  };

  return (
    <>
      <DefaultLayout>
        <div className="bg-light m-4 p-4 rounded shadow">
          <label className="form-label text-dark font-weight-bold mb-2">
            Question Statement:
          </label>
          <input
            className="form-control mb-4"
            type="text"
            value={currentQuestion.statement}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                statement: e.target.value,
              })
            }
          />

          <div className="my-4">
            <h3 className="text-lg font-weight-bold mb-2">Options:</h3>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  className="form-control"
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                />
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => removeOption(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="input-group mb-2">
              <input
                className="form-control"
                type="text"
                value={currentQuestion.correctOption}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    correctOption: e.target.value,
                  })
                }
              />
              <span className="text-muted ml-2">Correct option</span>
            </div>
            <button className="btn btn-success" onClick={addOption}>
              Add Option
            </button>
          </div>

          <button className="btn btn-primary mr-2" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn m-2 btn-purple" onClick={handleFinish}>
            Finish Creating the Quiz
          </button>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Question;
