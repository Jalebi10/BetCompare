const mongoose = require('mongoose');

const bettingSiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    apiEndpoint: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    lastSync: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BettingSite', bettingSiteSchema); 