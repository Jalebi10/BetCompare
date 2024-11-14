const { Client } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
        headless: true
    },
    qrTimeoutMs: 0,  // No timeout for QR scanning
    authTimeoutMs: 0 // No timeout for auth
});

module.exports = client; 