/* eslint-disable no-undef */
import 'jasmine';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('get the api endpoint', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    done();
  });
});

// import frisby from 'frisby';

// it('should return a status of 200', () => {
//   return frisby.get('http://localhost:3000').expect('status', 200);
// });
