// Automate the process of adding devices to the user 
//randon generation by faker 

const express = require('express');
const mongoose = require('mongoose');
const User = require("./user.model"); // Replace './models/user' with the correct path to your User model file.
const faker = require('faker'); // Import the faker library

const app = express();
const port = 5000;

// Middleware to parse JSON in the request body
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://tundeANarchy:TUnDEaNArCHy1098@anarchyapi.sjcrato.mongodb.net/anarchy?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Function to generate a random device
function generateRandomDevice() {
  return {
    clientId: faker.random.uuid(),
    devicetype: faker.random.arrayElement(['laptop', 'smartphone', 'tablet', 'smartwatch']),
    manufacturer: faker.random.arrayElement(['Dell', 'Samsung', 'Apple', 'Fitbit', 'HP', 'Google']),
    osplatform: faker.random.arrayElement(['Windows 10', 'Android', 'iOS', 'Fitbit OS', 'Windows 11']),
  };
}

// Create a new device for a specific user
async function createDevice(username, newDevice) {
  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    // Push the new device to the devices array
    user.devices.push(newDevice);

    // Save the updated user object
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
}

// API endpoint to add a new device for a user
app.post('/users/:username/devices', async (req, res) => {
  const username = req.params.username;

  // Generate a random device
  const newDevice = generateRandomDevice();

  try {
    const user = await createDevice(username, newDevice);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});