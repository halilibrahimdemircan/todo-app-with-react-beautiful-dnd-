const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todoController");

router
    .post("/", todoController.createTodo)
    .post("/order", todoController.updateTodosOrder)
    .patch("/:todoId/done", todoController.markTodoAsDone)
    .patch("/:todoId", todoController.updateTodo)
    .delete("/:todoId", todoController.deleteTodo);

// .get('/', todoController.getAllTodosByCategory)

module.exports = router;
