const User = require('../models/user');

class ResponsibleGamblingService {
    static async checkBetLimit(user, betAmount) {
        const dailyBets = await this.getDailyBets(user);
        const monthlyBets = await this.getMonthlyBets(user);
        
        if (this.isOverDailyLimit(dailyBets, betAmount)) {
            throw new Error('Daily betting limit reached');
        }
        
        if (this.isOverMonthlyLimit(monthlyBets, betAmount)) {
            throw new Error('Monthly betting limit reached');
        }
    }

    static async addSelfExclusion(user, duration) {
        user.selfExclusion = {
            startDate: new Date(),
            endDate: new Date(Date.now() + duration),
            active: true
        };
        await user.save();
    }

    static async provideBettingAdvice(user) {
        const bettingPattern = await this.analyzeBettingPattern(user);
        if (bettingPattern.risky) {
            await this.sendRiskWarning(user);
        }
    }
}

module.exports = ResponsibleGamblingService; 