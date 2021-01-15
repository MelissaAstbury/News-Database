const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserByUsername,
  postNewUser,
} = require('../controllers/userControllers');

router.get('/', getAllUsers);
router.get('/user/:username', getUserByUsername);
router.post('/', postNewUser);

module.exports = router;
