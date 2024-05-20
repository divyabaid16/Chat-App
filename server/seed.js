// seedGroups.js
const mongoose = require('mongoose');
const User = require('./models/User');
const Group = require('./models/Group');
const Message = require('./models/Message');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB Connection Successful');
}).catch((error) => {
  console.log('Error', error.message);
});

const users = [
  {
    _id: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    username: "divya",
    email: "divya@gmail.com",
    password: "$2a$10$teCIzms3GRfvtXlEcb0Lf.iqJs6jzLvd7T4OxFaUMSAgmX3ORpGOG",
    userId: "d3f1cd7a-c2c3-4908-b39e-7cec27e9581c"
  },
  {
    _id: new mongoose.Types.ObjectId("6649eb3be696139c24c52264"),
    username: "Umang",
    email: "umang@gmail.com",
    password: "$2a$10$vWxsmeT1EK./gaYqmHingun1BHI7VqWGXMFj7LyifY/a.IgnjstSC",
    userId: "582fc07e-ce78-4194-af27-8c3343c4b68c"
  }
];

const groups = [
  {
    _id: new mongoose.Types.ObjectId("664cae458ccf272cdcc548df"),
    name: "Fitness Group",
    description: "Join us to share fitness tips, workout routines, and motivate each other towards our fitness goals!",
    createdBy: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    groupId: "51f291e5-e7e7-4a01-be89-72927db89541"
  },
  {
    _id: new mongoose.Types.ObjectId("664cae458ccf272cdcc548e0"),
    name: "Entertainment Group",
    description: "A place to discuss movies, TV shows, music, and all things entertainment!",
    createdBy: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    groupId: "d5c18b41-99d0-41aa-8b19-6de7f1a9e8cb"
  },
  {
    _id: new mongoose.Types.ObjectId("664cae458ccf272cdcc548e1"),
    name: "Travel Group",
    description: "Share your travel experiences, tips, and bucket list destinations with fellow travelers!",
    createdBy: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    groupId: "f3e8e4ef-5fd9-464f-8445-3ae202db78c8"
  },
  {
    _id: new mongoose.Types.ObjectId("664cae458ccf272cdcc548e2"),
    name: "Book Club",
    description: "Love reading? Join our book club to discuss the latest reads, share recommendations, and connect with fellow bookworms!",
    createdBy: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    groupId: "4186b73c-f961-4875-af06-90b4be6d6cc0"
  },
  {
    _id: new mongoose.Types.ObjectId("664cae458ccf272cdcc548e3"),
    name: "Cooking Group",
    description: "Calling all foodies! Join us to share recipes, cooking tips, and culinary adventures!",
    createdBy: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    groupId: "f9b04b39-2ad1-4224-bdbf-7a5a70c27d0e"
  },
  {
    _id: new mongoose.Types.ObjectId("664cae458ccf272cdcc548e4"),
    name: "Art Enthusiasts",
    description: "A community for art lovers to share their favorite artworks, discuss techniques, and inspire creativity!",
    createdBy: new mongoose.Types.ObjectId("6649eb3be696139c24c52264"),
    groupId: "f1d5123b-af48-4a84-821d-13e4e02551b2"
  },
  {
    _id: new mongoose.Types.ObjectId("664cae458ccf272cdcc548e5"),
    name: "Tech Geeks",
    description: "Join us to explore the latest in technology, discuss gadgets, and share insights on innovations!",
    createdBy: new mongoose.Types.ObjectId("6649eb3be696139c24c52264"),
    groupId: "4bf6e245-1a88-40bb-9e5c-fa152b190aab"
  }
];

const messages = [
  {
    _id: new mongoose.Types.ObjectId("664cafd593a75bd4a396d156"),
    messageString: "Hey Welcome to the group!",
    sender: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    group: new mongoose.Types.ObjectId("664cae458ccf272cdcc548df"),
    messageId: "b844e56e-f48a-4217-8a24-56b29d791dd4",
    dateTime: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId("664cafd593a75bd4a296d159"),
    messageString: "Hi everyone, let's get motivated and crush our fitness goals together!",
    sender: new mongoose.Types.ObjectId("6649eb3be696139c24c52264"),
    group: new mongoose.Types.ObjectId("664cae458ccf272cdcc548df"),
    messageId: "9a63f112-c480-4fb0-9eab-1551522d0a32",
    dateTime: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId("664cafd593a75bd4a396d15a"),
    messageString: "Hey everyone, what's your favorite workout routine?",
    sender: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    group: new mongoose.Types.ObjectId("664cae458ccf272cdcc548df"),
    messageId: "0c3e526e-204f-4d5f-93f5-993e6f5453d7",
    dateTime: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId("664cafd593a75bd4a396d15b"),
    messageString: "Good morning! Time to sweat it out!",
    sender: new mongoose.Types.ObjectId("6649eb3be696139c24c52264"),
    group: new mongoose.Types.ObjectId("664cae458ccf272cdcc548df"),
    messageId: "5b245a54-6f58-4b17-b589-b1c78e84856e",
    dateTime: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId("664cafd593a75bd4a396d15e"),
    messageString: "Let's keep each other accountable for our fitness goals!",
    sender: new mongoose.Types.ObjectId("6649eb3be696139c24c52264"),
    group: new mongoose.Types.ObjectId("664cae458ccf272cdcc548df"),
    messageId: "2f4ae84e-321a-4b8b-9208-0b3fa3b68a4f",
    dateTime: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId("664cafd593a75bd4a396d161"),
    messageString: "Stay motivated, stay fit!",
    sender: new mongoose.Types.ObjectId("6649b90f2c1608f0fdddcc4c"),
    group: new mongoose.Types.ObjectId("664cae458ccf272cdcc548df"),
    messageId: "0b3498c7-4b8a-4b1c-8f1a-5b1c3b3c5b6f",
    dateTime: new Date()
  },
  {
    _id: new mongoose.Types.ObjectId("664cb1d593a75bd4a396d20d"),
    messageString: "Sounds Good",
    sender: new mongoose.Types.ObjectId("6649eb3be696139c24c52264"),
    group: new mongoose.Types.ObjectId("664cae458ccf272cdcc548df"),
    messageId: "be9482ac-670c-44c2-99e3-55bfcae232f5",
    dateTime: new Date()
  }
];

const seedUsers = async () => {
  try {
    const userPromises = users.map(async (user) => {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create(user);
        console.log(`User ${user.username} seeded`);
      } else {
        console.log(`User ${user.username} already exists`);
      }
    });
    await Promise.all(userPromises);
  } catch (error) {
    console.error('Seeding users error', error);
  }
};

const seedGroups = async () => {
  try {
    const groupPromises = groups.map(async (group) => {
      const existingGroup = await Group.findOne({ groupId: group.groupId });
      if (!existingGroup) {
        await Group.create(group);
        console.log(`Group ${group.name} seeded`);
      } else {
        console.log(`Group ${group.name} already exists`);
      }
    });
    await Promise.all(groupPromises);
  } catch (error) {
    console.error('Seeding groups error', error);
  }
};

const seedMessages = async () => {
  try {
    const messagePromises = messages.map(async (message) => {
      const existingMessage = await Message.findOne({ messageId: message.messageId });
      if (!existingMessage) {
        await Message.create(message);
        console.log(`Message ${message.messageId} seeded`);
      } else {
        console.log(`Message ${message.messageId} already exists`);
      }
    });
    await Promise.all(messagePromises);
  } catch (error) {
    console.error('Seeding messages error', error);
  }
};


const seedData = async () => {
  try {
    await seedUsers();
    await seedGroups();
    await seedMessages();
  } catch (error) {
    console.log('Seeding error', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
