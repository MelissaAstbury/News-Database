const {
  fetchAllUsers,
  fetchUserByUsername,
  addNewUser,
} = require('../models/userModels');

exports.getAllUsers = (req, res, next) => {
  const { sort_by } = req.query;
  fetchAllUsers(sort_by)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

exports.postNewUser = (req, res, next) => {
  const newUser = req.body;
  addNewUser(newUser).then((user) => {
    res.status(201).send(user);
  });
};
