const { fetchAllTopics, addNewTopic } = require('../models/topicModels');

exports.getAllTopics = (req, res, next) => {
  const { sort_by } = req.query;
  fetchAllTopics(sort_by)
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postNewTopic = (req, res, next) => {
  const newTopic = req.body;
  addNewTopic(newTopic).then((topic) => {
    res.status(201).send(topic);
  });
};
