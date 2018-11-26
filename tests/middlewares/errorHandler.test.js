import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mockRes } from 'sinon-express-mock';
import errorHandler from '../../src/middlewares/errorHandler';

chai.use(sinonChai);
const res = mockRes();
const next = sinon.spy();
const error = {
  message: 'error message',
};

describe('The errorHandler middleware', () => {
  it('should send status 500 with error message on error', () => {
    errorHandler(error, null, res, next);

    res.status.should.have.been.calledWith(500);
    res.json.should.have.been.calledWith({
      status: 'error',
      message: error.message,
    });
  });
});
