/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const CreateCourse = () => {
  const [Name, setName] = useState('');
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.role === "Admin";
  const teacherId = currentUser._id;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/courseSystem/postACourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name, teacherId }), // Corrected payload format
      });

      const result = await response.json();
      console.log('result from create course api', result);
      navigate(-1);
      return result;
    } catch (error) {
      console.log('error from course creator', error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center createFrom min-vh-100" style={{color: '#fff' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-2xl font-semibold text-center mb-4">
                  Add New Course
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Name"
                      name="Name"
                      autoComplete="Name"
                      value={Name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="btn btn-outline-warning"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
