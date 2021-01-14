const { deleteArticle, updateArticleById } = require('../models/articleModels');

exports.deleteById = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticle(article_id).then((article) => {
    res.sendStatus(204);
  });
};

exports.updateById = (req, res, next) => {
  const { article_id } = req.params;
  const { voteIncrease } = req.body;
  updateArticleById(article_id, voteIncrease)
    .then(([articleVoteIncreased]) => {
      res.status(201).send({ articleVoteIncreased });
    })
    .catch((err) => {
      next(err);
    });
};
