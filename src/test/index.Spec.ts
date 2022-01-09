/* eslint-disable no-undef */
import 'jasmine';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test /api/image responses', () => {
  describe('with none or incomplete parameters', () => {
    it('no parameters send should return 500 and "no input file"', async () => {
      const response = await request.get('/api/image');
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error: No input file');
    });
    it('filename sends that exists should return 200 and an image as a return content-type', async () => {
      const response = await request.get('/api/image?filename=aFileName');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('image/jpeg');
    });
    it('filename sends that does not exists should return 500 and "no valid input file"', async () => {
      const response = await request.get('/api/image?filename=notafilename');
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error: No valid input file');
    });
  });
  describe('Test /api/image responses with full correct parameters', () => {
    it('parameters send should return 200 and an image as a return content-type', async () => {
      const response = await request.get(
        '/api/image?filename=aFileName&width=200&height=200'
      );
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('image/jpeg');
    });
  });
  describe('Test /api responses', () => {
    it('should return 200', async () => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });
  });
});
