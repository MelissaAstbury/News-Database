const express = require('express');
const router = express.Router();

const { deleteById } = require('../controllers/articleControllers');

router.delete('/:article_id', deleteById);

module.exports = router;
