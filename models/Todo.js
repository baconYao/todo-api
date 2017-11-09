const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    reuqired: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
