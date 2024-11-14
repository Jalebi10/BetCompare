require('dotenv').config();
const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleBettingQuery } = require('./services/bettingService');
const { connectDB } = require('./config/database');
const oddsRouter = require('./routes/odds');
const MenuService = require('./services/menuService');
const SessionManager = require('./services/sessionManager');
const PredictionService = require('./services/predictionService');
const SocialBettingService = require('./services/socialBettingService');
const VirtualBettingService = require('./services/virtualBettingService');
const BettingCalculatorService = require('./services/calculatorService');
const AchievementService = require('./services/achievementService');
const GamificationService = require('./services/gamificationService');
const StreakService = require('./services/streakService');
const AIService = require('./services/aiService');
const LanguageService = require('./services/languageService');
const UserService = require('./services/userService');

const app = express();
const port = process.env.PORT || 3000;

// Initialize WhatsApp client
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox']
    }
});

// WhatsApp Authentication
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// Handle incoming messages
client.on('message', async (message) => {
    try {
        const session = await SessionManager.getSession(message.from);
        const input = message.body.toLowerCase();
        
        // Detect language if not set
        if (!session.language) {
            const detectedLang = await LanguageService.detectLanguage(input);
            SessionManager.updateSession(message.from, { language: detectedLang });
        }

        // Language selection command
        if (input.startsWith('!language')) {
            const lang = input.split(' ')[1];
            if (LanguageService.SUPPORTED_LANGUAGES[lang]) {
                SessionManager.updateSession(message.from, { language: lang });
                const response = await LanguageService.getWelcomeMessage(lang);
                return message.reply(response);
            }
        }

        // Process command and translate response
        const response = await processCommand(input, session);
        const translatedResponse = await LanguageService.getLocalizedResponse(
            response, 
            session.userId
        );
        
        return message.reply(translatedResponse);
    } catch (error) {
        console.error('Error handling message:', error);
        message.reply('Sorry, there was an error processing your request.');
    }
});

async function handleNumericInput(session, number) {
    switch (session.currentMenu) {
        case 'main':
            switch (number) {
                case 1: 
                    session.currentMenu = 'soccer';
                    return MenuService.getSoccerMenu();
                case 2:
                    session.currentMenu = 'horseracing';
                    return MenuService.getHorseRacingMenu();
                // ... handle other main menu options
            }
            break;
        
        case 'soccer':
            switch (number) {
                case 1:
                    return MenuService.getMatchesByCompetition('today');
                case 2:
                    return MenuService.getMatchesByCompetition('premier-league');
                // ... handle other soccer menu options
            }
            break;
            
        case 'horseracing':
            switch (number) {
                case 1:
                    return MenuService.getTodaysRaces();
                case 2:
                    return MenuService.getUpcomingRaces();
                // ... handle other horse racing menu options
            }
            break;
    }
}

client.initialize();

// API routes
app.use(express.json());
app.use('/api/odds', oddsRouter);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB();
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}); 