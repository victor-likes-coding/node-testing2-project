// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const common = {
  client: 'sqlite3',
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

module.exports = {
  development: {
    ...common,
    connection: {
      filename: './dev.sqlite3',

      pool: {
        afterCreate: (conn, done) => {
          conn.run('PRAGMA foreign_keys = ON', done);
        },
      },
    },
  },

  testing: {
    ...common,
    connection: {
      filename: './test.sqlite3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },
};
