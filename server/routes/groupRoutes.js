const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');

router.get('/', (req, res) => {
  Group.find()
    .then(groups => res.json(groups))
    .catch(() => res.status(500).json({ message: 'Server error' }));
});

router.post('/', (req, res) => {
  const { name, description, createdBy } = req.body;

  User.findById(createdBy)
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const group = new Group({ name, description, createdBy });
      return group.save()
        .then(() => res.status(201).json(group));
    })
    .catch(() => res.status(500).json({ message: 'Server error' }));
});

router.delete('/:groupId', (req, res) => {
  const { groupId } = req.params;

  Group.findById(groupId)
    .then(group => {
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      if (group.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this group' });
      }

      return group.remove()
        .then(() => res.json({ message: 'Group deleted successfully' }));
    })
    .catch(() => res.status(500).json({ message: 'Server error' }));
});

module.exports = router;
