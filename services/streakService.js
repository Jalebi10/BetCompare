class StreakService {
    static async getUserStreaks(userId) {
        return `
🔥 *Your Active Streaks*

Winning Streak: 3 days
Current Rewards:
- 1.1x XP Multiplier
- Daily Streak Bonus: R10

Betting Streak: 7 days
Rewards Unlocked:
- Daily Free Bet
- Enhanced Odds Access
- Premium Tips

Keep your streak alive!
Next bet needed in: 12:34:56`;
    }

    static async getStreakChallenges() {
        return `
⚡ *Streak Challenges*

🎯 Daily Streak (3/5)
Reward: Increasing XP multiplier
Current: 1.1x → Next: 1.2x

🎲 Betting Streak (7/10)
Reward: Enhanced features
Next: Advanced Statistics

💰 Profit Streak (2/7)
Reward: Special betting bonus
Progress: R250/R500`;
    }
} 