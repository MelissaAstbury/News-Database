const connection = require('../db/connection');

exports.deleteArticle = (article_id) => {
  return connection('articles').del().where({ article_id });
};

exports.updateArticleById = (article_id, voteIncrease) => {
  return connection('articles')
    .returning('*')
    .where('article_id', '=', article_id)
    .increment('votes', voteIncrease)
    .then((result) => {
      return result;
    });
};
