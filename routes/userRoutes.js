const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/userControllers');
const { getUserByUsername } = require('../controllers/userControllers');

router.get('/', getAllUsers);
router.get('/user/:username', getUserByUsername);

module.exports = router;
