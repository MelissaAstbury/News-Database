const express = require('express');
const router = express.Router();

const { deleteById, updateById } = require('../controllers/articleControllers');

router.delete('/:article_id', deleteById);
router.patch('/:article_id', updateById);

module.exports = router;
