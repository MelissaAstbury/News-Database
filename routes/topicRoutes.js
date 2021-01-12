const express = require('express');
const router = express.Router();

const { getAllTopics } = require('../controllers/topicControllers');

router.get('/', getAllTopics);

module.exports = router;
