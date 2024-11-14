require('dotenv').config({ path: '.env.test' });
const app = require('../app');
const { connectDB } = require('../config/database');
const TestDataGenerator = require('../utils/testData');
const WhatsAppClient = require('../config/whatsapp');

async function launchTestEnvironment() {
    try {
        // Connect to test database
        await connectDB();
        console.log('✅ Test database connected');

        // Load test data
        await loadTestData();
        console.log('✅ Test data loaded');

        // Initialize WhatsApp client
        await WhatsAppClient.initialize();
        console.log('✅ WhatsApp client initialized');

        // Start server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`
🚀 Test Environment Running!

Server: http://localhost:${port}
Mode: Testing
Max Users: ${process.env.MAX_TEST_USERS}
Virtual Money: R${process.env.STARTING_BALANCE}

Scan QR code with WhatsApp to start testing...
            `);
        });

    } catch (error) {
        console.error('❌ Error launching test environment:', error);
        process.exit(1);
    }
}

async function loadTestData() {
    // Load test matches
    const matches = TestDataGenerator.getTestMatches();
    // Load test races
    const races = TestDataGenerator.getTestHorseRaces();
    // Store in test database
}

launchTestEnvironment(); 