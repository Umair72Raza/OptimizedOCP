/* eslint-disable no-unused-vars */
import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="position-relative margin-top-custom pt-5 footer-color py-6" >
        <div className="container-lg">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="mb-6">
                <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#15803d" className="bi bi-person-circle" width="32" height="32">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM9 14s1 1 3 1 3-1 3-1-1 2-3 2-3-2-3-2z" />
                  </svg>
                  <span className="ms-2 text-3xl font-bold text-gray-800">Geni<span className="text-success">IT</span>eam</span>
                </a>
              </div>
            </div>

            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4 mb-4 mb-md-0">
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                  <ul className="list-unstyled text-gray-500">
                    <li className="mb-2">
                      <a href="https://flowbite.com/" className="text-decoration-none">Flowbite</a>
                    </li>
                    <li>
                      <a href="https://tailwindcss.com/" className="text-decoration-none">Tailwind CSS</a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-4 mb-4 mb-md-0">
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                  <ul className="list-unstyled text-gray-500">
                    <li className="mb-2">
                      <a href="https://github.com/themesberg/flowbite" className="text-decoration-none">Github</a>
                    </li>
                    <li>
                      <a href="https://discord.gg/4eeurUVvTy" className="text-decoration-none">Discord</a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-4">
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
                  <ul className="list-unstyled text-gray-500">
                    <li className="mb-2">
                      <a href="#" className="text-decoration-none">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none">Terms & Conditions</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="text-center text-sm text-gray-500">
          © 2023 <a href="https://flowbite.com/" className="text-decoration-none">Flowbite™</a>. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
