const User = require('../models/user');
const client = require('../config/whatsapp');

class NotificationService {
    static async sendOddsAlert(user, event, odds) {
        if (!user.preferences.notifications.odds) return;
        
        const message = `🔔 Odds Alert!\n\n${event}\nBest odds: ${odds}\n\nReply with !bet to place a bet`;
        await client.sendMessage(user.phoneNumber, message);
    }

    static async sendResultNotification(user, bet) {
        if (!user.preferences.notifications.results) return;
        
        const result = bet.status === 'won' 
            ? `🎉 Congratulations! You won R${bet.potentialWinnings}`
            : `😔 Better luck next time!`;
            
        const message = `Bet Result:\n${bet.event}\n${result}`;
        await client.sendMessage(user.phoneNumber, message);
    }

    static async sendPromotionalOffer(user, promotion) {
        if (!user.preferences.notifications.promotions) return;
        
        const message = `🎁 Special Offer!\n\n${promotion.description}\n\nReply with !promo to claim`;
        await client.sendMessage(user.phoneNumber, message);
    }
}

module.exports = NotificationService; 