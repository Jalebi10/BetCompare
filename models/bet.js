const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    betType: String,
    amount: {
        type: Number,
        required: true
    },
    odds: Number,
    potentialWinnings: Number,
    bettingSite: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'won', 'lost', 'cancelled'],
        default: 'pending'
    },
    placedAt: {
        type: Date,
        default: Date.now
    },
    settledAt: Date,
    betReference: String
}); 