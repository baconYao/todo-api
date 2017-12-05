const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt =require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWTSECRET.toString()).toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(userToken) {
  var user = this;

  return user.update({
    // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
    $pull: {
      tokens: {
        token: userToken
      }
    }
  })
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWTSECRET.toString());
  } catch(e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });

    return Promise.reject('auth error');
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject("No this user!");
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          resolve(user);
        } else {
          reject("Error password");
        }
      });
    });
  }) 
};

/* 
 * 在save前，先執行此function
 */
UserSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT), (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashedValue) => {
        user.password = hashedValue;
        next();
      });
    });
  } else {
    next();
  }
});


var User = mongoose.model('User', UserSchema);;
module.exports = { User };
