const _ = require('lodash');
const mongoose = require('mongoose');
const {User} = require('../models/User');
const { ObjectID } = require('mongodb');

exports.addUser = (req, res) => {
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
