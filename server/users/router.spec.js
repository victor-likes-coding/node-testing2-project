const request = require('supertest');
const server = require('../../server');

describe('server', () => {
  describe('[GET] /', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get('/')
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it('should return JSON', () => {
      return request(server)
        .get('/')
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
