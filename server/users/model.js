const { knex } = require('knex');
const /** @type {knex} */ db = require('../../data/dbConfig');

const get = () => {
  return db('users');
};

const add = ({ user, returnNewUser = true, isTesting = false }) => {
  let query = db('users').insert(user);

  if (returnNewUser) {
    if (isTesting) {
      query = query.then(([id]) => db('users').where({ id }).first());
    } else {
      query = query.then(([id]) => getById(id));
    }
  }

  return query;
};

const getById = (id) => {
  return db('users').where({ id }).first();
};

module.exports = {
  get,
  add,
  getById,
};
