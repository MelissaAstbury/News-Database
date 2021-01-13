const connection = require('../db/connection');

exports.deleteArticle = (article_id) => {
  return connection('articles').del().where({ article_id });
};
