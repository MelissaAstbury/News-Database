const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');
const { changeTimeFormat } = require('../utils/data-manipulation.js');

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex.insert(topicData).into('topics').returning('*');
    })
    .then(() => {
      return knex.insert(userData).into('users').returning('*');
    })
    .then(() => {
      const formattedArticles = changeTimeFormat(articleData);
      return knex.insert(formattedArticles).into('articles').returning('*');
    })
    .then((articleRows) => {
      console.log(articleRows);
    });
};
