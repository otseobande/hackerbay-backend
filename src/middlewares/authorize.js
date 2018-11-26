import jwt from 'jsonwebtoken';
import stripToken from '../utils/stripToken';

/**
 * Verify user's jwt token
 *
 * @param  {object} req - Request Object
 * @param {object} res - Response Object
 * @param {Function} next - middleware next
 *
 * @return {Function | json}
 */
const authorize = (req, res, next) => {
  try {
    const token = stripToken(req);
    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'Token is invalid or not provided',
    });
  }
};

export default authorize;
