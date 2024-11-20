## VR Tour Platform - Installation Guide
# Version: 1.0.0
# Last Updated: October 2024
# Author: Harsh Kumar
# ID: 92124365

## Table of Contents

Prerequisites
Environment Setup
Installation Steps
Configuration
Running the Application

# 1. Prerequisites
Required Software

Node.js (v16.0.0 or higher)
npm (v8.0.0 or higher) or Yarn (v1.22.0 or higher)
Git (v2.30.0 or higher)
MongoDB Atlas account
Modern web browser (Chrome, Firefox, Safari, or Edge)

System Requirements

RAM: Minimum 4GB (8GB recommended)
Storage: 3GB free space
CPU: Dual-core processor or better
Internet connection: Broadband (10 Mbps or faster)

# Verify Prerequisites
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
## 2. Environment Setup
# 2.1 MongoDB Atlas Setup

Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
Create new cluster (Free tier is sufficient)
Configure network access:

Add your IP address
Set up database user


Get connection string from Atlas dashboard

## 2.2 Create Environment Variables
Create a .env file in the project root:
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key

# Optional Configurations
CORS_ORIGIN=http://localhost:5000
MAX_UPLOAD_SIZE=10485760

## 3. Installation Steps

# 3.1 Clone Repository
# Clone the repository
git clone https://github.com/harsh74-2/VR-web-app.git

# Navigate to project directory
cd VR-web-app

## 3.2 Install Backend Dependencies
# Install backend dependencies
npm install

# Verify installation
npm list

# 3.3 Install Frontend Dependencies
# Navigate to client directory
cd client

# Install frontend dependencies
npm install

# Return to root directory
cd ..

## 4. Configuration

# 4.1 Backend Configuration

Configure MongoDB connection:
// config/database.js
module.exports = {
  url: process.env.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};

Configure JWT settings:
// config/auth.js
module.exports = {
  secret: process.env.JWT_SECRET,
  tokenExpiration: '24h'
};


# 4.2 Frontend Configuration

Update API endpoint (if needed):
// client/src/config/api.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


## 5. Running the Application

# 5.1 Development Mode
# Start backend server
npm run server

# In a new browser tab, start frontend
http://localhost:5000/