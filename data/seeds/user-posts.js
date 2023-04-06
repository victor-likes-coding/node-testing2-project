exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('posts').truncate();
  await knex('users').truncate();

  const users = [
    { username: 'john', email: 'john@gmail.com', password: 'password' },
    { username: 'jane', email: 'jane@gmail.com', password: 'password' },
    { username: 'bob', email: 'bob@gmail.com', password: 'password' },
  ];

  const posts = [
    { user_id: 1, title: 'My first post', content: 'This is my first post.' },
    { user_id: 1, title: 'My second post', content: 'This is my second post.' },
    { user_id: 1, title: 'My third post', content: 'This is my third post.' },
    {
      user_id: 2,
      title: 'Hello, world!',
      content: 'This is my hello world post.',
    },
    {
      user_id: 2,
      title: 'My favorite things',
      content: 'Here are some of my favorite things.',
    },
    {
      user_id: 2,
      title: 'My travel bucket list',
      content: 'These are the places I want to visit.',
    },
    {
      user_id: 3,
      title: 'My favorite books',
      content: 'Here are some of my favorite books.',
    },
    {
      user_id: 3,
      title: 'My favorite movies',
      content: 'Here are some of my favorite movies.',
    },
    {
      user_id: 3,
      title: 'My favorite TV shows',
      content: 'Here are some of my favorite TV shows.',
    },
  ];

  try {
    await knex('users').insert(users);
    const insertedUsers = await knex('users').select('id');
    const userIds = insertedUsers.map((user) => user.id);
    const postsWithUserId = posts.map((post) => ({
      ...post,
      user_id: userIds[post.user_id - 1],
    }));
    await knex('posts').insert(postsWithUserId);
  } catch (err) {
    console.error(err);
  }
};
