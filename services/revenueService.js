const User = require('../models/user');
const Bet = require('../models/bet');
const BettingSite = require('../models/bettingSite');

class RevenueService {
    static COMMISSION_RATES = {
        STANDARD: 0.005    // 0.5% commission on all bets
    };

    static AFFILIATE_RATES = {
        HOLLYWOODBETS: 0.25, // 25% revenue share
        BETWAY: 0.30,        // 30% revenue share
        SUPABETS: 0.28       // 28% revenue share
    };

    static async calculateCommission(bet) {
        return bet.amount * this.COMMISSION_RATES.STANDARD;
    }

    static async trackAffiliateRevenue(bettingSite, amount) {
        const rate = this.AFFILIATE_RATES[bettingSite.toUpperCase()];
        return amount * rate;
    }

    static async calculateDailyRevenue() {
        const today = new Date();
        const revenue = {
            commissions: 0,
            affiliates: 0
        };

        // Calculate commission revenue
        const dailyBets = await Bet.find({
            createdAt: {
                $gte: new Date(today.setHours(0, 0, 0, 0)),
                $lt: new Date(today.setHours(23, 59, 59, 999))
            }
        });

        for (const bet of dailyBets) {
            revenue.commissions += await this.calculateCommission(bet);
            revenue.affiliates += await this.trackAffiliateRevenue(bet.bettingSite, bet.amount);
        }

        return revenue;
    }

    static async calculateOperatingCosts() {
        return {
            serverCosts: 1000,      // R1000/month hosting
            apiCosts: 2000,         // R2000/month API fees
            whatsappCosts: 500,     // R500/month WhatsApp Business
            aiCosts: 1500           // R1500/month AI processing
        };
    }
}

module.exports = RevenueService; 