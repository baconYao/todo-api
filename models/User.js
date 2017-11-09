const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    reuqired: true,
    minlength: 1
  }
});

module.exports = mongoose.model('User', UserSchema);
