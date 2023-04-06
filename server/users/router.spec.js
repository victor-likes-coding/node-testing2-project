const db = require('../../data/dbConfig');
const request = require('supertest');
const server = require('../../server');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe('server', () => {
  describe('sanity test', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });

  describe('[GET] /api/users', () => {
    let result;
    beforeEach(async () => {
      result = await request(server).get('/api/users');
    });
    it('should return 200 OK', async () => {
      expect(result.status).toBe(200);
    });

    it('should return JSON', () => {
      expect(result.type).toBe('application/json');
    });

    it('should return an array', () => {
      expect(result.body).toHaveLength(3);
    });
  });

  describe('[GET] /api/users/:id', () => {
    let result;
    beforeEach(async () => {
      result = await request(server).get('/api/users/1');
    });
    it('should return 200 OK, with type JSON, and return a user', async () => {
      expect(result.status).toBe(200);
      expect(result.type).toBe('application/json');
      expect(result.body).toMatchObject({
        id: 1,
        username: 'john',
        email: 'john@gmail.com',
      });
    });
  });

  describe('[POST] /api/users', () => {
    let result;
    const jim = {
      username: 'jim',
      email: 'jim@gmail.com',
      password: 'password',
    };
    beforeEach(async () => {
      result = await request(server).post('/api/users').send(jim);
    });

    it('should return 201 OK, with type JSON, and return a user', async () => {
      expect(result.status).toBe(201);
      expect(result.type).toBe('application/json');
      expect(result.body).toMatchObject({
        id: 4,
        ...jim,
      });
    });
  });
});
