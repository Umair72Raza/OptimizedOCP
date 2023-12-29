/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

const QuestionCard = ({
  question,
  marks,
  setMarks,
  allSelectedOptions,
  setAllSelectedOption,
}) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.role === "Admin";

  const [updatedOptions, setUpdatedOptions] = useState([...question.options]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    const questionId = question._id;

    // Update the selectedOptions for the current question
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: selectedValue,
    }));

    // Check if the questionId is already present in allSelectedOptions
    const existingIndex = allSelectedOptions.findIndex(
      (item) => item.questionId === questionId
    );

    if (existingIndex !== -1) {
      // If yes, update the selected value for that questionId
      const updatedOptions = [...allSelectedOptions];
      updatedOptions[existingIndex] = {
        questionId,
        selectedValue,
      };
      setAllSelectedOption(updatedOptions);
    } else {
      // If no, add a new entry for that questionId
      setAllSelectedOption((prevAllSelectedOptions) => [
        ...prevAllSelectedOptions,
        {
          questionId,
          selectedValue,
        },
      ]);
    }
  };

  const handleUpdateOptionChange = (index, newValue) => {
    const newOptions = [...updatedOptions];
    newOptions[index] = newValue;
    setUpdatedOptions(newOptions);
  };

  const handleUpdateOptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/questionsSystem/updateOptions",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: question._id,
            updatedOptions,
          }),
        }
      );

      if (response.ok) {
        // Handle successful update
        console.log("Options updated successfully");
      } else {
        // Handle errors
        console.log(response);
        console.error("Failed to update options");
      }
    } catch (error) {
      console.error("Error updating options:", error);
    }
  };

  return (
    <>
      {isAdmin ? (
        <>
          <div className=" d-flex align-items-center justify-content-center rounded p-2 m-2">
            <div
              style={{ backgroundColor: "#f0f0f0", width: "30%" }}
              key={question._id}
              className="p-4 rounded-4"
            >
              <p className="fw-bold fs-4 justify-content-center font-semibold mb-3 text-gray-800 px-4">
                {question.statement}
              </p>
              <p className="fw-bold px-4 text-gray-600 mb-3 ">Options: </p>

              <ul>
                {question?.options.map((option, index) => (
                  <li key={index} className="mb-3 list-style-none">
                    <label className="d-flex align-items-center justify-content-center cursor-pointer text-gray-800">
                      <input
                        type="text"
                        value={updatedOptions[index]}
                        onChange={(e) =>
                          handleUpdateOptionChange(index, e.target.value)
                        }
                        className="mr-2 cursor-pointer  form-control "
                        aria-describedby="basic-addon2"
                      />
                      <span className="ml-3 text-peach-500"></span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <button
              style={{ width: "" }}
              className="btn btn-primary mt-2"
              onClick={handleUpdateOptions}
            >
              Update
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{width:'100%'}} className="d-flex googleDyphilia justify-content-center p-3">
            <div style={{width:'50%'}} key={question._id} className="custom-card ">
              <div className="d-flex flex-column align-items-center justify-content-center">
              <p className="text-2xl font-semibold mb-3 text-gray-800">
                {question.statement}
              </p>
              <p className="text-gray-600 mb-3">
                Selected Option: {selectedOptions[question._id]}
              </p>

              <ul>
                {question?.options.map((option, index) => (
                  <li key={index} className="mb-3 list-style-none">
                    <label className="flex items-center cursor-pointer text-gray-800">
                      <input
                        type="radio"
                        value={option}
                        checked={selectedOptions[question._id] === option}
                        onChange={handleOptionChange}
                        className="mr-2 cursor-pointer"
                      />
                      <span className=" m-2">{option}</span>
                      <span className="m-2 ">
                        {selectedOptions[question._id] === option && (
                          <i className="fas fa-check-circle"></i>
                        )}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionCard;
