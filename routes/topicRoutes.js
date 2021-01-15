const express = require('express');
const router = express.Router();

const {
  getAllTopics,
  postNewTopic,
} = require('../controllers/topicControllers');

router.get('/', getAllTopics);
router.post('/', postNewTopic);

module.exports = router;
