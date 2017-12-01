const express = require('express');
const router = express.Router();

const { authenticate } = require("../controllers/middlewares");
const todoController = require("../controllers/routeController/todoController");
const userController = require("../controllers/routeController/userController");


router.post('/todos', todoController.postTodos);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodosId);
router.delete('/todos/:id', todoController.deleteTodosByID);
router.patch('/todos/:id', todoController.patchTodosById);

router.post('/users', userController.addUser);

router.get('/users/me', authenticate, 
                        userController.findMySelf
          );

module.exports = router;
