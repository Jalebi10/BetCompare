const BettingSite = require('../models/bettingSite');
const NotificationService = require('./notificationService');

class OddsTrackerService {
    static async trackOddsMovement(event) {
        const historicalOdds = await this.getHistoricalOdds(event);
        const prediction = this.predictOddsMovement(historicalOdds);
        
        if (prediction.significant) {
            const users = await this.getUsersInterestedInEvent(event);
            for (const user of users) {
                await NotificationService.sendOddsAlert(user, event, prediction);
            }
        }
    }

    static async predictOddsMovement(historicalOdds) {
        // Implement ML model for odds prediction
        // This is a simplified example
        const trend = this.calculateTrend(historicalOdds);
        return {
            significant: trend.change > 0.1,
            prediction: trend.direction,
            confidence: trend.confidence
        };
    }
}

module.exports = OddsTrackerService; 