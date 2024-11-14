const axios = require('axios');
const User = require('../models/user');

class PredictionService {
    static async getDailyTips() {
        return `
🔮 *Today's Hot Tips*

⚽ SOCCER
1. Liverpool vs Chelsea
   Tip: Liverpool Win + Over 2.5 Goals
   Success Rate: 78%

🏇 HORSE RACING
2. Durban July - Race 4
   Tip: Lucky Strike (Place Bet)
   Form: Won last 3 races

🏉 RUGBY
3. Bulls vs Sharks
   Tip: Bulls -7.5 Points
   Historical Success: 82%

Reply with !tip <number> for detailed analysis`;
    }

    static async getPersonalizedTips(userId) {
        const user = await User.findById(userId);
        const bettingHistory = await this.analyzeBettingHistory(user);
        
        return `
🎯 *Personalized Tips Based on Your History*

Best Performing:
- Sport: ${bettingHistory.bestSport}
- Market: ${bettingHistory.bestMarket}
- Time: ${bettingHistory.bestTime}

Today's Matches in Your Favorite Categories:
${await this.getMatchesForUser(user)}`;
    }

    static async getHotStreaks() {
        return `
🔥 *Current Hot Streaks*

Teams on Fire:
1. Manchester City - Won last 5 games
2. Mamelodi Sundowns - Clean sheets in last 4 games
3. Kaizer Chiefs - Scored 2+ goals in last 3 games

Form Players:
1. Haaland - Scored in last 6 games
2. Salah - 8 goals in 5 games

Reply with !streak <number> for more details`;
    }
}

module.exports = PredictionService; 