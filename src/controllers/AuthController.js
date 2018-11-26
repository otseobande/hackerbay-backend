import jwt from 'jsonwebtoken';

export default {
  /**
   * Generates a JWT token an returns it to the user
   *
   * @param {Object} request Express request
   * @param {Object} response Express response
   *
   * @returns {json}
   */
  login(request, response) {
    const token = jwt.sign({
      username: request.username,
    }, process.env.JWT_SECRET);

    return response.status(200).json({
      message: 'Login successful',
      token,
    });
  },
};
