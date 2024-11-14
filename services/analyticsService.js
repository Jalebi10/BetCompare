const Bet = require('../models/bet');
const User = require('../models/user');

class AnalyticsService {
    static async getUserStats(userId) {
        const bets = await Bet.find({ user: userId });
        
        return {
            totalBets: bets.length,
            winRate: this.calculateWinRate(bets),
            profitLoss: this.calculateProfitLoss(bets),
            favoriteMarkets: this.getFavoriteMarkets(bets),
            bestPerformingSport: this.getBestPerformingSport(bets)
        };
    }

    static async getBettingTrends() {
        // Analyze overall betting patterns
        const trends = await Bet.aggregate([
            {
                $group: {
                    _id: '$sport',
                    totalBets: { $sum: 1 },
                    avgOdds: { $avg: '$odds' }
                }
            }
        ]);
        
        return trends;
    }
}

module.exports = AnalyticsService; 