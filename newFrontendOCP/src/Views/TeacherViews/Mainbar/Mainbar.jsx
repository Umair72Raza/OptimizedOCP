/* eslint-disable no-unused-vars */

import { Navbar, Container, Nav } from "react-bootstrap";

import { useState } from "react";
import BackButton from "../../../components/BackButton/BackButton";

export const MainBar = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = (e) => {
    e.preventDefault(); // Prevents the default behavior of the button
    setMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    // Add your logout logic here, e.g., clear user data from local storage and redirect to login page
    localStorage.removeItem("currentUser");
    // Add any additional logout logic you may have
  };

  const openModal = () => {
    // Your existing code for opening the modal
  };

  return (
    <Navbar
      style={{ backgroundColor: "lightblue" }}
      className="fixed w-100 googleDyphilia"
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="/HomePage">
          <div className="d-flex p-2 pt-3 me-2">
            <div className=" padding-left">
              <BackButton />
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="mt-3 bi bi-fire  bg-success"
                viewBox="0 0 16 16"
              >
                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
              </svg>
            </div>
            <span className="fs-1 fw-bold text-gray-800 px-2">
              Geni<span className="text-blue">IT</span>eam
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">
              <div className="position-relative">
                {currentUser ? (
                  <button
                    type="button"
                    className="position-relative d-flex rounded-circle no-bg-color text-sm mt-3"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={handleMenuToggle}
                  >
                    <span className="position-absolute -inset-1.5"></span>
                    <img
                      className="rounded-circle  navbar-blue"
                      src={`https://eu.ui-avatars.com/api/?name=${currentUser?.username
                        .split(" ")
                        .join("+")}&size=50`}
                      alt="profile"
                    />
                  </button>
                ) : (
                  <button onClick={openModal} className="btn btn-dark pb-3">
                    Login
                  </button>
                )}

                {isMenuOpen && currentUser && (
                  <div className="position-relative z-10 end-0 rounded-md shadow-sm mt-2 w-48">
                    <button
                      className=" btn btn-danger px-4 py-2  text-sm text-gray-700"
                      onClick={handleLogOut}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </Nav.Link>

            {currentUser && (
              <>
                <Nav.Link
                  href="/HomePage"
                  className="home-icon pt-3 d-flex gap-3"
                >
                  <svg
                    width="50"
                    height="70"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 1.33333L1.33325 14.3333H6.66659V26.6667H12V18.6667H20V26.6667H25.3333V14.3333H30.6666L16 1.33333Z"
                      fill="#3498db"
                    ></path>

                    <path
                      d="M5.33325 15.9999V25.3333H26.6666V15.9999L16 7.33325L5.33325 15.9999Z"
                      fill="#e74c3c"
                    ></path>

                    <rect
                      x="14.6666"
                      y="15.9999"
                      width="2.66667"
                      height="8.00001"
                      fill="#2ecc71"
                    ></rect>
                  </svg>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainBar;
