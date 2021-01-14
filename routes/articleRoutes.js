const express = require('express');
const router = express.Router();

const {
  getArticleById,
  deleteById,
  updateById,
} = require('../controllers/articleControllers');

router.get('/:article_id', getArticleById);
router.delete('/:article_id', deleteById);
router.patch('/:article_id', updateById);

module.exports = router;
