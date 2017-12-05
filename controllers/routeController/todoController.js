const _ = require('lodash');
const mongoose = require('mongoose');
const Todo = require('../../models/Todo');
const { ObjectID } = require('mongodb');

exports.post_todos = (req, res) => {
  var todos = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todos.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
};

exports.get_todos = (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((doc) => {
    res.send({doc});
  }, (err) => {
    res.status(400).send(err);
  });
};

exports.get_todos_id = (req, res) => {

  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo) {
      res.status(404).send();
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send();
  }).catch(e => res.status(404).send());
};

exports.delete_todos_by_id = (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo) {
      return res.status(404).send(); 
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
};


exports.patch_todos_by_id = (req, res) => {
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

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, 
    {$set: body}, {new: true})
    .then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(404).send();
  });
};