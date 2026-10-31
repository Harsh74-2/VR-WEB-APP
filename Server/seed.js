const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path based on your structure
const Tour = require('./models/Tour'); // Adjust the path based on your structure
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Sample Users
    const users = [
      {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'TestPassword123', // Make sure to hash this in a real scenario
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'Password456', // Make sure to hash this in a real scenario
      },
    ];

    // Sample Tours
    const tours = [
      {
        title: 'Beach Paradise',
        description: 'A virtual tour of a sunny beach.',
        category: 'Nature',
        media: 'beach360.jpg',
        uploadedBy: 'testuser',
      },
      {
        title: 'City Lights',
        description: 'A virtual tour of a city skyline at night.',
        category: 'City',
        media: 'city360.jpg',
        uploadedBy: 'user2',
      },
    ];

    // Insert Users
    User.insertMany(users)
      .then(() => {
        console.log('Users inserted');
        return Tour.insertMany(tours);
      })
      .then(() => {
        console.log('Tours inserted');
        return mongoose.disconnect();
      })
      .then(() => {
        console.log('Disconnected from MongoDB');
      })
      .catch(err => {
        console.error(err);
      });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
