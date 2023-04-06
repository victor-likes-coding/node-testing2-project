// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const common = {
  client: 'sqlite3',
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  useNullAsDefault: true,
};

module.exports = {
  development: {
    ...common,
    connection: {
      filename: './data/dev.sqlite3',

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
      filename: './data/test.sqlite3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },
};
