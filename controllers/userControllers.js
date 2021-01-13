const { fetchAllUsers } = require('../models/userModels');

exports.getAllUsers = (req, res, next) => {
  const { sort_by } = req.query;
  fetchAllUsers(sort_by)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
