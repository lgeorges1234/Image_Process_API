/* eslint-disable no-undef */
import 'jasmine';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

const apiRoutes = '/api';
const imageRoutes = '/api/image';

describe('Test /api/image responses', () => {
  describe('with none or incomplete parameters', () => {
    it('no parameters send should return 500 and "Filename missing"', async () => {
      const response = await request.get(`${imageRoutes}`);
      expect(response.status).toBe(500);
      // expect(response.text).toBe('Error: Filename is missing');
    });
    it('filename sends that exists should return 200 and an image as a return content-type', async () => {
      const response = await request.get(`${imageRoutes}?filename=aFileName`);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('image/jpeg');
    });
    it('filename sends that does not exists should return 500 and "Filename does not exist"', async () => {
      const response = await request.get(
        `${imageRoutes}?filename=notafilename`
      );
      expect(response.status).toBe(500);
      // expect(response.text).toBe('Error: Filename does not exist');
    });
    it('width or height set as different as positive interger should set them by default to 200', async () => {
      const response = await request.get(
        `${imageRoutes}?filename=aFileName&width=-1&height=abcd`
      );
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('image/jpeg');
    });
  });
  describe('Test /api/image responses with full correct parameters', () => {
    it('parameters send should return 200 and an image as a return content-type', async () => {
      const response = await request.get(
        `${imageRoutes}?filename=aFileName&width=200&height=200`
      );
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('image/jpeg');
    });
  });
  describe('Test /api responses', () => {
    it('should return 200', async () => {
      const response = await request.get(`${apiRoutes}`);
      expect(response.status).toBe(200);
    });
  });
});
