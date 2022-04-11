const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController')

router
    .post('/', categoryController.createCategory)
    .get('/', categoryController.getAllCategories)
    .post('/order', categoryController.updateCategoryOrder)

module.exports = router;