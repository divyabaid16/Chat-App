const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');

router.get('/:groupId', async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const messages = await Message.find({ group: groupId }).exec();

    const updatedMessages = await Promise.all(messages.map(async (message) => {
      const sender = await User.findOne(message.sender);
      const username = sender ? sender.username : 'Unknown';
      return { ...message.toJSON(), username: username };
    }));

    res.json({ messages: updatedMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
