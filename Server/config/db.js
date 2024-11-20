// db.js

// Import MongoClient from the mongodb package
import { MongoClient } from 'mongodb';

// Import dotenv for environment variable management
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URL from the environment variables
const url = process.env.MONGODB_URI;

// Database name
const dbName = 'VR';

// Create a new MongoClient instance
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Variable to store the database connection
let db;

// Function to connect to MongoDB
export async function connectToDatabase() {
  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');

    // Store the database connection
    db = client.db(dbName);

    // Return the database instance
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Function to get the database instance
export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

// Function to close the MongoDB connection
export async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
}
