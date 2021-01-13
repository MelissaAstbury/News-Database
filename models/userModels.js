const connection = require('../db/connection');

exports.fetchAllUsers = (sort_by = 'name') => {
  return connection.select('*').from('users').orderBy(sort_by);
};
exports.fetchUserByUsername = (username) => {
  return connection
    .select('*')
    .from('users')
    .where('username', '=', username)
    .then(([user]) => {
      return user;
    });
};
