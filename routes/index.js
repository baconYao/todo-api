const express = require('express');
const router = express.Router();

const todoController = require("../controllers/todoController");


router.post('/todos', todoController.todos);

module.exports = router;
