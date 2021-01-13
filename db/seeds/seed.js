const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');
const {
  changeTimeFormat,
  createLookup,
  changeBelongsToFormat,
} = require('../utils/data-manipulation.js');

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
      const articleLookup = createLookup(articleRows, 'title', 'article_id');
      const timeComments = changeTimeFormat(commentData);
      const formattedComments = changeBelongsToFormat(
        timeComments,
        articleLookup
      );
      return knex.insert(formattedComments).into('comments').returning('*');
    });
  // .then((commentRows) => {
  //   console.log(commentRows);
  // });
};
