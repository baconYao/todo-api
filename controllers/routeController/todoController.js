const _ = require('lodash');
const mongoose = require('mongoose');
const Todo = require('../../models/Todo');
const { ObjectID } = require('mongodb');

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

exports.getTodosId = (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  
  Todo.findById(id).then((todo) => {
    if(!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send();
  }).catch(e => res.status(404).send());
};

exports.deleteTodosByID = (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send(); 
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
};


exports.patchTodosById = (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(404).send();
  });
};