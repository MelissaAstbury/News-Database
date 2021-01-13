const { deleteArticle } = require('../models/articleModels');

exports.deleteById = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticle(article_id).then((article) => {
    res.sendStatus(204);
  });
};
