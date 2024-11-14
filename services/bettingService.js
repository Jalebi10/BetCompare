const axios = require('axios');
const BettingSite = require('../models/bettingSite');
const User = require('../models/user');
const Bet = require('../models/bet');
const ResponsibleGamblingService = require('./responsibleGamblingService');
const NotificationService = require('./notificationService');
const AIService = require('./aiService');
const MLService = require('./mlService');

const BETTING_SITES = {
    HOLLYWOOD_BETS: 'hollywoodbets',
    BETWAY: 'betway',
    SUPABETS: 'supabets'
};

async function handleBettingQuery(message) {
    const query = message.replace('!bet', '').trim();
    const [sport, event, betType] = query.split(',').map(item => item.trim());
    
    try {
        const odds = await compareOdds(sport, event, betType);
        return formatOddsResponse(odds);
    } catch (error) {
        console.error('Error fetching odds:', error);
        return 'Sorry, I could not fetch the odds at this moment.';
    }
}

async function compareOdds(sport, event, betType) {
    const odds = [];
    
    for (const site of Object.values(BETTING_SITES)) {
        const siteOdds = await fetchOdds(site, sport, event, betType);
        odds.push({
            site,
            odds: siteOdds
        });
    }
    
    return odds.sort((a, b) => b.odds - a.odds);
}

async function fetchOdds(site, sport, event, betType) {
    // Implement specific API calls for each betting site
    switch(site) {
        case BETTING_SITES.HOLLYWOOD_BETS:
            return await fetchHollywoodBetsOdds(sport, event, betType);
        case BETTING_SITES.BETWAY:
            return await fetchBetwayOdds(sport, event, betType);
        case BETTING_SITES.SUPABETS:
            return await fetchSupabetsOdds(sport, event, betType);
        default:
            throw new Error('Unsupported betting site');
    }
}

function formatOddsResponse(odds) {
    let response = '🎯 Best Odds Available:\n\n';
    
    odds.forEach((site, index) => {
        response += `${index + 1}. ${site.site.toUpperCase()}\n`;
        response += `   Odds: ${site.odds}\n\n`;
    });
    
    response += '\nTo place a bet, reply with:\n';
    response += '!place <site> <amount> <bet-id>';
    
    return response;
}

async function placeBet(userId, betDetails) {
    const user = await User.findById(userId);
    
    // Check responsible gambling limits
    await ResponsibleGamblingService.checkBetLimit(user, betDetails.amount);
    
    // Verify user has sufficient balance
    if (user.balance < betDetails.amount) {
        throw new Error('Insufficient balance');
    }
    
    // Create and save bet
    const bet = new Bet({
        user: userId,
        ...betDetails,
        potentialWinnings: calculatePotentialWinnings(betDetails.amount, betDetails.odds)
    });
    
    await bet.save();
    
    // Update user balance
    user.balance -= betDetails.amount;
    user.bettingHistory.push(bet._id);
    await user.save();
    
    // Send confirmation notification
    await NotificationService.sendBetConfirmation(user, bet);
    
    return bet;
}

// Add support for different bet types
const BET_TYPES = {
    SINGLE: 'single',
    MULTI: 'multi',
    SYSTEM: 'system'
};

async function handleMultiBet(bets) {
    // Implementation for multiple bets
}

async function getEnhancedOddsComparison(sport, event, betType) {
    const odds = await compareOdds(sport, event, betType);
    const aiAnalysis = await AIService.getPredictions(event);
    const valueBets = await AIService.detectValueBets(odds);
    
    return {
        odds,
        prediction: aiAnalysis,
        valueBets,
        confidence: aiAnalysis.confidence
    };
}

async function getPersonalizedBetSuggestions(userId) {
    const userAnalysis = await AIService.analyzeBettingPattern(userId);
    const suggestions = await AIService.getPersonalizedAdvice(userId);
    
    return {
        suggestions,
        riskLevel: userAnalysis.riskLevel,
        recommendedMarkets: userAnalysis.preferredMarkets,
        strategies: userAnalysis.successfulStrategies
    };
}

module.exports = {
    handleBettingQuery
}; 