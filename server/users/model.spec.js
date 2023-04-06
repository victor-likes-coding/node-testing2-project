const db = require('../../data/dbConfig');
const { get, add, getById } = require('./model');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

const newUser = {
  email: 'jacob@gmail.com',
  password: 'password',
  username: 'jacob',
};

describe('[users] get', () => {
  it('should return all users', async () => {
    const users = await get();
    expect(users).toHaveLength(3);

    expect(users[0]).toMatchObject({
      id: 1,
      email: 'john@gmail.com',
    });
  });
});

describe('[users] add', () => {
  it('should add a user', async () => {
    const user = await add({
      user: newUser,
      returnNewUser: true,
      isTesting: true,
    });
    expect(user).toMatchObject({
      id: 4,
      email: 'jacob@gmail.com',
    });
  });
});

describe('[users] getById', () => {
  it('should return a user by id', async () => {
    const user = await getById(1);
    expect(user).toMatchObject({
      id: 1,
      username: 'john',
      email: 'john@gmail.com',
    });

    const user2 = await add({
      user: newUser,
    });

    expect(user2).toMatchObject({
      id: 4,
      email: 'jacob@gmail.com',
      username: 'jacob',
    });

    const user3 = await getById(4);
    expect(user3).toMatchObject({
      id: 4,
      email: 'jacob@gmail.com',
      username: 'jacob',
    });
  });
});
