VR Web Application
A web-based virtual reality platform that allows users to view, create, and interact with virtual tours.

Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js: You need to have Node.js installed on your local machine. You can download it from https://nodejs.org/en.
MongoDB: Either a local MongoDB instance or a cloud-based MongoDB Atlas account.
Git: Basic understanding of Git for cloning the repository.
Installation Instructions
Follow these steps to install and run the project on your local machine:

1. Clone the Repository
git clone https://github.com/Harsh74-2/VR-WEB-APP.git
cd VR-WEB-APP

2. Install Server Dependencies
Navigate to the Server directory and install the necessary packages:

cd Server
npm install

3. Install Client Dependencies
Now, navigate to the Client directory and install the dependencies for the frontend:

cd ../Client
npm install

4. Set Up Environment Variables
In the Server directory, create a .env file and add your MongoDB connection string and JWT secret:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your_database_name?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000
Replace <username>, <password>, and your_database_name with your MongoDB credentials.

5. Run the Application
To run the application go into the directory of the file and open terminal.
Type:
npm start server

Now, open the browser and type localhost:5000
