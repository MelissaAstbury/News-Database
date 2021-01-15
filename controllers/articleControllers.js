const {
  fetchArticleById,
  deleteArticle,
  updateArticleById,
  fecthArticleCommentsById,
  addCommentToArticle,
} = require('../models/articleModels');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
};

exports.deleteById = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticle(article_id)
    .then((article) => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.updateById = (req, res, next) => {
  const { article_id } = req.params;
  const { voteIncrease } = req.body;
  updateArticleById(article_id, voteIncrease)
    .then(([articleVoteIncreased]) => {
      res.status(201).send({ articleVoteIncreased });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  fecthArticleCommentsById(article_id).then(([comment]) => {
    res.send({ comment });
  });
};

exports.postNewCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const comment = {
    created_by: req.body.username,
    body: req.body.body,
    article_id: article_id,
  };
  addCommentToArticle(comment)
    .then(([newComment]) => {
      res.status(201).send({ comment: newComment });
    })
    .catch(next);
};
