// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');
const fileUploadRoutes = require('./routes/fileUpload')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/file', fileUploadRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));