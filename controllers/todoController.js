const mongoose = require('mongoose');
const Todo = require('../models/Todo');

exports.postTodos = (req, res) => {
  var todos = new Todo({
    text: req.body.text
  });

  todos.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
};

exports.getTodos = (req, res) => {
  Todo.find().then((doc) => {
    res.send({doc});
  }, (err) => {
    res.status(400).send(err);
  });
};