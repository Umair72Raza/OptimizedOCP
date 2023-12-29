/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const StudentDetails = ({ email, role, username, _id }) => {
  return (
    <div  className="max-w-md mx-auto bg-white shadow-md p-8 mt-8 rounded-md ">
      <h2 className="text-3xl text-black font-semibold">Student Details</h2>
      <ul className="list-disc pl-4 text-black">
        <li className="mb-2">
          <strong>Email:</strong> {email}
        </li>
        <li className="mb-2">
          <strong>Role:</strong> {role}
        </li>
        <li className="mb-2">
          <strong>Username:</strong> {username}
        </li>
        <li className="mb-2">
          <strong>ID:</strong> {_id}
        </li>
      </ul>
    </div>
  );
};

export default StudentDetails;
