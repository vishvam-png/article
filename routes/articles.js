const express = require('express');
const router = express.Router();

const { createArticle, updateArticle } = require('../validators/article.validator');
const validateRequest = require('../utils/validateRequest');
const ctrl = require('../controllers/articlesController');

router.get('/', ctrl.list);
router.post('/', createArticle, validateRequest, ctrl.create);
router.patch('/:id', updateArticle, validateRequest, ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
