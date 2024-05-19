const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Group = mongoose.model('group', groupSchema);

module.exports = Group;