import React from 'react';
import './ErrorComponent.css'
const ErrorComponent = ({ errorMessage }) => {
  return errorMessage ? (
    <div className="error-message">
      <p>{errorMessage}</p>
    </div>
  ) : null;
};

export default ErrorComponent;
