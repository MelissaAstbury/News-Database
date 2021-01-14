const connection = require('../db/connection');

exports.fetchArticleById = (article_id) => {
  return connection
    .select('*')
    .from('articles')
    .where('article_id', '=', article_id)
    .then(([article]) => {
      return article;
    });
};

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

exports.fecthArticleCommentsById = (article_id) => {
  return connection
    .select('*')
    .from('comments')
    .where({ article_id })
    .then((article) => {
      if (!article)
        return Promise.reject({ status: 404, msg: 'Article not found' });
      return article;
    });
};
