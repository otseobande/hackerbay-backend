import jwt from 'jsonwebtoken';

export default {
  /**
   * Generates a JWT token an returns it to the user
   *
   * @param {Object} request Express request object
   * @param {Object} response Express response object
   * @param {next} next Express middleware next function
   *
   * @returns {json}
   */
  login(request, response, next) {
    try {
      const token = jwt.sign({
        username: request.body.username,
      }, process.env.JWT_SECRET);

      return response.status(200).json({
        message: 'Login successful',
        token,
      });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  },
};
