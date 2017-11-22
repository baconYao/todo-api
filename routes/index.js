const express = require('express');
const router = express.Router();

const todoController = require("../controllers/todoController");


router.post('/todos', todoController.postTodos);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodosId);
router.delete('/todos/:id', todoController.deleteTodosByID);

module.exports = router;
