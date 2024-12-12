// server.js

require('dotenv').config({ path: './config/.env' });  // Specify the path to the .env file
  // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.json());  // Middleware to parse JSON bodies

const dbURI = process.env.MONGO_URI;  // MongoDB URI from .env

console.log("Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });


// Create a route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.status(200).json(users); // Return users as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a route to add a new user
// Example of POST request
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;
    try {
      const newUser = new User({ name, email, age });
      await newUser.save();
      res.json(newUser); // Return the newly created user
    } catch (err) {
      res.status(500).json({ message: 'Error adding user' });
    }
  });
  

// Create a route to update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser); // Return updated user
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a route to delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id); // Delete user by ID
    res.status(200).json({ message: 'User deleted successfully' }); // Success message
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
