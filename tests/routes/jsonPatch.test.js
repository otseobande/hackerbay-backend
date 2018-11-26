import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../src/app';

dotenv.config();
chai.use(chaiHttp);

describe('Json patch routes', () => {
  const token = jwt.sign({
    username: 'otse',
  }, process.env.JWT_SECRET);

  it('should return status 401 with error message if no token is passed', (done) => {
    chai.request(app)
      .post('/api/v1/json-patch')
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({
          status: 'error',
          message: 'Token is invalid or not provided',
        });

        done();
      });
  });

  it('should return a 400 status with error message if "patch" is not provided in body', (done) => {
    chai.request(app)
      .post('/api/v1/json-patch')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: {},
      })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({
          message: [
            '"patch" is required',
          ],
        });

        done();
      });
  });

  it('should return a 400 status with error message if "patch" provided in the wrong format', (done) => {
    chai.request(app)
      .post('/api/v1/json-patch')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: {},
        patch: {},
      })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({
          message: [
            '"op" is required',
            '"path" is required',
          ],
        });

        done();
      });
  });

  it('should return a 200 status and patch json document properly', (done) => {
    chai.request(app)
      .post('/api/v1/json-patch')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: {
          name: 'Otse',
          country: 'Nigeria',
        },
        patch: { op: 'replace', path: '/name', value: 'Obande' },
      })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          message: 'Patch successful',
          patchedDocument: {
            name: 'Obande',
            country: 'Nigeria',
          },
        });

        done();
      });
  });
});
