// db.js

// Import the MongoDB driver
import { MongoClient } from 'mongodb';

// Import dotenv for managing environment variables
require('dotenv').config();

// Database connection URL
// Use environment variable for the connection string to keep it secure
const url = process.env.MONGODB_URI;

// Database name
const dbName = 'VR';

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Variable to store the database connection
let db;

// Function to connect to the database
async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected successfully to MongoDB');

    // Get the database instance
    db = client.db(dbName);

    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Function to get the database instance
function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

// Function to close the database connection
async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
}

// Export the functions and client for use in other parts of the application
export default {
  connectToDatabase,
  getDb,
  closeDatabaseConnection,
  client,
};