const request = require('supertest');
const server = require('../../server');

describe('server', () => {
  describe('sanity test', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });
});
