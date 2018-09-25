const request = require('supertest');
const app = require('../server/server.js');

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/artists/2').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body[0].albums[0].albumID).toEqual(response.body[0].artistID * 10 + 1);
      done();
    });
  });
});