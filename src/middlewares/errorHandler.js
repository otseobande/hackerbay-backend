/**
 * Formats 'express-validation' response and handles other errors in the application
 *
 * @param {Object} error
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {json}
 */
const errorHandler = (error, request, response, next) => { // eslint-disable-line no-unused-vars
  if (error.statusText && error.statusText === 'Bad Request') {
    const message = error.errors.reduce((acc, err) => acc.concat(err.messages), []);

    return response.status(400).json({
      message,
    });
  }

  return response.status(error.status || 500).json({
    status: 'error',
    message: error.message,
  });
};

export default errorHandler;
