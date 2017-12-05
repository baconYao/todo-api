const express = require('express');
const router = express.Router();

const { authenticate } = require("../controllers/middlewares");
const todoController = require("../controllers/routeController/todoController");
const userController = require("../controllers/routeController/userController");


router.post('/todos', todoController.post_todos);
router.get('/todos', todoController.get_todos);
router.get('/todos/:id', todoController.get_todos_id);
router.delete('/todos/:id', todoController.delete_todos_by_id);
router.patch('/todos/:id', todoController.patch_todos_by_id);

router.post('/users', userController.add_user);

router.get('/users/me', authenticate, 
                        userController.find_my_self
);

router.post('/users/login', userController.login);

router.delete('/users/me/token', authenticate, 
                                 userController.delete_token
);

module.exports = router;
