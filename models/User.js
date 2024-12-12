// models/User.js

const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
});

// Export the model so it can be used in server.js
module.exports = mongoose.model('User', UserSchema);
