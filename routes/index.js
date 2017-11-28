const express = require('express');
const router = express.Router();

const todoController = require("../controllers/todoController");
const userController = require("../controllers/userController");


router.post('/todos', todoController.postTodos);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodosId);
router.delete('/todos/:id', todoController.deleteTodosByID);
router.patch('/todos/:id', todoController.patchTodosById);

router.post('/users', userController.addUser);

module.exports = router;
