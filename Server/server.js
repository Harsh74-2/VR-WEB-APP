// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');
const fileUploadRoutes = require('./routes/fileUpload');
const agentRoutes = require('./routes/agentRoutes');

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
app.use('/api', agentRoutes);

// Serve static files from the React app (the client lives at the repo root,
// not inside Server/ — the old path pointed at Server/client/build, which
// never existed)
const CLIENT_BUILD = path.join(__dirname, '..', 'Client', 'build');
app.use(express.static(CLIENT_BUILD));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));