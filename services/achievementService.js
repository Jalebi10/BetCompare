class AchievementService {
    static async getUserAchievements(userId) {
        return `
🏅 *Your Achievements*

Unlocked:
🏆 First Win
⭐ 10 Successful Bets
🎯 3 Win Streak
💰 R1000 Profit Milestone

Next Challenges:
🔒 Win 5 in a row (2/5)
🔒 Place bets on 5 different sports (3/5)
🔒 Achieve 150% ROI in a week

Reply !challenge to start new challenge`;
    }

    static async getDailyChallenges() {
        return `
📅 *Daily Challenges*

Today's Tasks:
1. Place 3 different sport bets
   Reward: R50 Free Bet
2. Win a multi-bet
   Reward: Odds Boost Token
3. Share 2 bets with friends
   Reward: Risk-Free Bet

Progress: 1/3 Complete`;
    }
} 