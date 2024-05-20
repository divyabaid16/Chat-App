const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');
const Message = require('../models/Message');

router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, description, createdBy } = req.body;

  try {
    const user = await User.findById(createdBy);

    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const group = new Group({ name, description, createdBy });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:groupId', async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this group' });
    }

    await Message.deleteMany({ group: groupId });

    await Group.deleteOne({ _id: groupId });

    return res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
