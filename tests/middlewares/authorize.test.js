/* eslint-disable no-unused-expressions */
import chai from 'chai';
import sinon from 'sinon';

import sinonChai from 'sinon-chai';
import dotenv from 'dotenv';

import { mockReq, mockRes } from 'sinon-express-mock';
import jwt from 'jsonwebtoken';
import authorize from '../../src/middlewares/authorize';

dotenv.config();
chai.should();
chai.use(sinonChai);

const res = mockRes();

const token = jwt.sign({
  username: 'otse',
}, process.env.JWT_SECRET);

describe('Authorize middleware', () => {
  const req = mockReq({
    headers: {
      authorization: 'Bearer asdf;uwajkdsf',
    },
  });
  const headerAuth = mockReq({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const queryAuth = mockReq({
    query: {
      token,
    },
    headers: {},
  });

  it('should call next function when token is in header', () => {
    const next = sinon.spy();
    authorize(headerAuth, res, next);

    next.should.have.been.called;
  });

  it('should call next function when token is in query', () => {
    const next = sinon.spy();
    authorize(queryAuth, res, next);

    next.should.have.been.called;
  });

  it('should return error 401 if token is wrong', () => {
    authorize(req, res);
    res.status.should.have.been.calledWith(401);
    res.json.should.have.been.calledWith({
      status: 'error',
      message: 'Token is invalid or not provided',
    });
  });
});
