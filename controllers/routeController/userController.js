const _ = require('lodash');
const mongoose = require('mongoose');
const {User} = require('../../models/User');
const { ObjectID } = require('mongodb');

const add_user = (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => {
    res.status(400).send(err);
  });
};

const find_my_self = (req, res) => {
  res.send(req.user);  
};

const login = (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
        .then((user) => {
          return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
          })
        })
        .catch((err) => {
          res.status(400).send(err);
        });
};

const delete_token = (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  });
};


module.exports = { add_user, find_my_self, login, delete_token };