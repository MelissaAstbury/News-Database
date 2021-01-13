const { fetchAllTopics } = require('../models/topicModels');

exports.getAllTopics = (req, res, next) => {
  const { sort_by } = req.query;
  fetchAllTopics(sort_by)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
