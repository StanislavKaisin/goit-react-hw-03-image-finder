import React from 'react';
import PropTypes from 'prop-types';

const ErrorNotification = ({ text }) => {
  return (
    <div>
      <h2>Error: {text}</h2>
    </div>
  );
};

ErrorNotification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorNotification;
