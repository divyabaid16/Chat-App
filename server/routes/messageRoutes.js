// messageRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/:groupId', (req, res) => {
  const groupId = req.params.groupId;
  Message.find({ group: groupId })
    .exec()
    .then(messages => {
      res.json({ messages });
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
