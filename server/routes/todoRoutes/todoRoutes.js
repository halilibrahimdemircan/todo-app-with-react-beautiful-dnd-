const express = require('express');
const router = express.Router();
const todoController = require('../../controllers/todoController')

router
    .post('/', todoController.createTodo)
    .post('/order', todoController.updateTodosOrder)
// .get('/', todoController.getAllTodosByCategory)

module.exports = router;