const express = require('express');
const router = express.Router();

const {
  getArticleById,
  deleteById,
  updateById,
  getArticleComments,
  postNewCommentByArticleId,
} = require('../controllers/articleControllers');

router.get('/:article_id', getArticleById);
router.delete('/:article_id', deleteById);
router.patch('/:article_id', updateById);
router.get('/:article_id/comments', getArticleComments);
router.post('/:article_id/comments', postNewCommentByArticleId);

module.exports = router;
