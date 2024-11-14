const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LanguageService = require('../services/languageService');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    email: String,
    balance: {
        type: Number,
        default: 0
    },
    bettingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bet'
    }],
    preferences: {
        favoriteTeams: [String],
        favoriteSports: [String],
        notifications: {
            odds: { type: Boolean, default: true },
            results: { type: Boolean, default: true },
            promotions: { type: Boolean, default: false }
        },
        language: {
            type: String,
            enum: Object.keys(LanguageService.SUPPORTED_LANGUAGES),
            default: 'en'
        }
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    lastActive: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 