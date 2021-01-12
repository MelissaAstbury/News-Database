const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
    .insert(topicData)
    .into('topics')
    .returning('*')
    })
    .then((result) => {
      console.log(result);
      return knex
        .insert(userData)
        .into('users')
        .returning('*')
    })
    .then((userRows) => {
      console.log(userRows)
      
    })
    .then(() => {

    })
};
