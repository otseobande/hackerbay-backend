import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.use(chaiHttp);

describe('Login route', () => {
  it('should return status 200 with JWT token if credentials are provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'otse',
        password: 'password',
      })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Login successful');
        expect(res.body.token).to.be.a('string');

        done();
      });
  });
  it('should return status 400 with error message if username is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        password: 'password',
      })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(400);
        expect(res.body.message).to.contain('"username" is required');

        done();
      });
  });

  it('should return status 400 with error message if password is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'otse',
      })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(400);
        expect(res.body.message).to.contain('"password" is required');

        done();
      });
  });
});
