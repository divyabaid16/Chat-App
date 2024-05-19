const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const messageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  messageString: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;