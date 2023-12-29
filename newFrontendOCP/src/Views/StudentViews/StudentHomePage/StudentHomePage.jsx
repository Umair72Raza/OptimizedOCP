/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
import StudentBanner from "../Banner/StudentBanner";
import StudentDefaultLayout from "../../../components/Layouts/StudentDefaultLayout";

export const StudentHomePage = () => {
  const user = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  return user ? (
    <>
      <div>
        <StudentDefaultLayout>
          <StudentBanner />
        </StudentDefaultLayout>
      </div>
    </>
  ) : (
    <>
      <button className="btn btn-dark" onClick={() => navigate("/Login")}>
        Go back to login
      </button>
    </>
  );
};

export default StudentHomePage;
