/* eslint-disable camelcase */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('posts').truncate();
  await knex('users').truncate();

  const users = [
    {
      username: 'john_doe',
      email: 'john_doe@gmail.com',
      password: 'password1',
    },
    {
      username: 'jane_doe',
      email: 'jane_doe@gmail.com',
      password: 'password2',
    },
    {
      username: 'bob_smith',
      email: 'bob_smith@gmail.com',
      password: 'password3',
    },
  ];

  const posts = [
    {
      title: 'Post 1',
      content: 'This is the first post',
      user_id: 1,
    },
    {
      title: 'Post 2',
      content: 'This is the second post',
      user_id: 1,
    },
    {
      title: 'Post 3',
      content: 'This is the third post',
      user_id: 1,
    },
    {
      title: 'Post 4',
      content: 'This is the fourth post',
      user_id: 2,
    },
    {
      title: 'Post 5',
      content: 'This is the fifth post',
      user_id: 2,
    },
    {
      title: 'Post 6',
      content: 'This is the sixth post',
      user_id: 3,
    },
  ];

  await knex('users').insert(users);

  await Promise.all(
    posts.map(async (post) => {
      const { user_id, post_text } = post;
      const [post_id] = await knex('posts').insert({ user_id, post_text });
      return knex('posts')
        .where('id', post_id)
        .update('created_at', new Date());
    }),
  );
};
