/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('posts', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users');
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.timestamps(true, true);
    });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  knex.schema.dropTableIfExists('posts').dropTableIfExists('users');
