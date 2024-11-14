const mongoose = require('mongoose');
const path = require('path');

const connectDB = async () => {
    try {
        // Windows specific MongoDB path
        const dbPath = process.env.MONGODB_URI || 'mongodb://localhost:27017/betcompare_test';
        
        // Windows specific options
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            // Windows specific paths for certificates if needed
            sslCA: process.env.SSL_CA_PATH ? path.resolve(process.env.SSL_CA_PATH) : undefined
        };

        await mongoose.connect(dbPath, options);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = { connectDB }; 