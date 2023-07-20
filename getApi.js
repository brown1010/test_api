// This code contains get API's by username & ClientID 
// add a new device for a user 

const express = require('express');
const mongoose = require('mongoose');

// Import the User model (Assuming the User model is defined in the './models/user' file)
const User = require('./user.model'); // Replace  with the correct path to your User model file.

const app = express();
const port = 5000; // Change the port number as per your requirement.

// Middleware to parse JSON in the request body
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://tundeANarchy:TUnDEaNArCHy1098@anarchyapi.sjcrato.mongodb.net/anarchy?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Create a new device for a specific user
async function createDevice(username, newdevice) {
    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('User not found');
        }

        // Push the new device to the devices array
        user.devices.push(newdevice);

        // Save the updated user object
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

//This is the code for adding device by taking object in req.body (in JSON) - Random  adinf devices coded in separate addDevice   
/* // API endpoint to add a new device for a user
app.post('/users/:username/devices', async (req, res) => {
    const username = req.params.username;
    const newdevice = req.body;

    try {
        const user = await createDevice(username, newdevice);
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error creating device:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}); */    


// GET endpoint to find a user by their username
app.get('/users/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




// GET endpoint to find devices by client ID
app.get('/devices/:clientId', async (req, res) => {
    const clientId = req.params.clientId;



    try {
        const user = await User.findOne({ 'devices.clientId': clientId }, 'devices');

        if (!user) {
            return res.status(404).json({ message: 'Devices not found' });
        }

        // Extract the devices with matching clientId from the user object
        const devices = user.devices.filter(devices => devices.clientId === clientId);

        res.status(200).json({ devices });
    } catch (error) {
        console.error('Error fetching devices:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});