/* eslint-disable no-unused-vars */

import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <svg
        className="mb-3"
        width="100"
        height="100"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#3B82F6"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>

      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <p className="mt-3 text-muted">Loading content...</p>
    </div>
  );
};

export default Loading;
