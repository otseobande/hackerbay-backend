import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../src/app';

dotenv.config();
chai.use(chaiHttp);

describe('Thumbnail routes', () => {
  const token = jwt.sign({
    username: 'otse',
  }, process.env.JWT_SECRET);
  it('should return a 401 status with error message token is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/create-thumbnail')
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

  it('should return a 400 status with error message imageUrl is not provided in body', (done) => {
    chai.request(app)
      .post('/api/v1/create-thumbnail')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({
          message: [
            '"imageUrl" is required',
          ],
        });

        done();
      });
  });

  it('should return a 200 status when image is downloaded successfully', (done) => {
    const binaryParser = (res, callback) => {
      res.setEncoding('binary');
      res.data = '';
      res.on('data', (chunk) => {
        res.data += chunk;
      });
      res.on('end', () => {
        callback(null, Buffer.from(res.data, 'binary'));
      });
    };

    chai.request(app)
      .post('/api/v1/create-thumbnail')
      .set('Authorization', `Bearer ${token}`)
      .send({
        imageUrl: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?cs=srgb&dl=autumn-colorful-colourful-33109.jpg&fm=jpg',
      })
      .buffer()
      .parse(binaryParser)
      .end((err, res) => {
        if (err) done(err);

        expect(res.headers['content-type']).to.equal('image/png');
        expect(res).to.have.status(200);
        expect(Buffer.isBuffer(res.body)).to.equal(true);

        done();
      });
  });
});
