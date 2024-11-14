module.exports = {
    database: {
        url: 'mongodb://localhost:27017/betcompare_test',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    whatsapp: {
        qrTimeout: 0,
        authTimeout: 0,
        restartOnAuth: true
    },
    testUsers: {
        maxUsers: 10,
        allowedNumbers: [
            // Add your test group's numbers
            '27123456789',  // Your number
            '27987654321'   // Friend's number
        ]
    },
    testMode: {
        virtualMoney: true,
        startingBalance: 1000,  // R1000 test money
        maxBet: 100,           // R100 max test bet
        simulatedOdds: true    // Use test betting data
    }
}; 