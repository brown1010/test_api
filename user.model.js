const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    devices: [{
        clientId: {
            type: String,
        },
        devicetype: {
            type: String,
            required: true
        },
        manufacturer: {
            type: String,
            required: true
        },
        osplatform: {
            type: String,
            required: true
        },
    }],

    socialLogin: {
        type: Array,
        required: true
    },

    skinNfts: {
        type: Array
    },

    wallet: {
        type: Boolean,
        default: false,
    },


    activeclans: {
        type: Array
    },

    activeweapons: {
        type: Array
    },

    activeskins: {
        type: Array
    },

    friends: {
        type: String
    },

    networktype: {
        type: String
    },

    walletAddress: {
        type: String
    },

    lastLogin: {
        type: Date
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },

    appversion: {
        type: String,
        required: false
    },

    lastUpdate: {
        type: String,

    },

    gaidfa: {
        type: String
    },

    ua: {
        type: String
    },

    os: {
        type: String
    },


})

module.exports = mongoose.model('Users', userSchema);