const User = require('../models/user');
const Bet = require('../models/bet');

class GamificationService {
    static LEVELS = {
        1: { name: "Rookie Bettor", threshold: 0, reward: "Welcome Bonus" },
        2: { name: "Amateur Punter", threshold: 100, reward: "Free Bet" },
        3: { name: "Regular Player", threshold: 500, reward: "Odds Boost" },
        4: { name: "Pro Bettor", threshold: 1000, reward: "Cashback Bonus" },
        5: { name: "Expert Analyst", threshold: 2500, reward: "VIP Status" },
        10: { name: "Betting Legend", threshold: 5000, reward: "Premium Features" }
    };

    static async getUserLevel(userId) {
        const user = await User.findById(userId);
        const xp = await this.calculateUserXP(user);
        const level = this.determineLevel(xp);
        
        return `
🎮 *Your Betting Profile*

Level ${level.number}: ${level.name}
XP: ${xp}/${this.getNextLevelThreshold(level.number)}
Progress: ${'🟦'.repeat(level.progress)}${'⬜'.repeat(10-level.progress)}

🏆 Current Perks:
- ${level.rewards.join('\n- ')}

Next Level Unlocks:
- ${this.getNextLevelRewards(level.number).join('\n- ')}`;
    }

    static async getDailyQuests() {
        return `
📋 *Daily Quests*

🎯 Active Quests:
1. Place 3 bets on different sports
   Progress: 1/3 | Reward: 50 XP
   
2. Win a bet with odds over 2.0
   Progress: 0/1 | Reward: 100 XP
   
3. Share a winning bet
   Progress: 0/1 | Reward: 75 XP

🎁 *Weekly Challenge*
Win 5 bets in different sports
Progress: 2/5 | Reward: 500 XP + Mystery Box

Type !quest <number> for details`;
    }

    static async getSeasonalEvent() {
        return `
🎪 *Seasonal Event: World Cup Special*

Complete challenges to earn World Cup tokens!

Current Progress:
🏆 Tokens: 145
🎯 Rank: Silver

Available Rewards:
1. Free Bet Bundle (100 tokens)
2. Exclusive Badge (200 tokens)
3. VIP Status (500 tokens)

Active Challenges:
1. Bet on 3 World Cup matches
2. Predict the tournament winner
3. Join a World Cup betting pool`;
    }

    static async getAchievementTree() {
        return `
🌟 *Achievement Tree*

Betting Master Path:
[✅] Place First Bet
[✅] Win First Bet
[⭐] Win 5 in a row (3/5)
[🔒] Win 10 in a row

Analysis Expert Path:
[✅] Use odds comparison
[✅] Find value bet
[⭐] Profit on 3 value bets (2/3)
[🔒] Master Analyzer Badge

Social Butterfly Path:
[✅] Join betting pool
[⭐] Win pool position (2/3)
[🔒] Create successful pool
[🔒] Community Leader Badge`;
    }

    static async getRewardsShop() {
        return `
🏪 *Rewards Shop*

Your Points: 1,250 ⭐

Available Rewards:
1. Odds Boost Token (500 ⭐)
2. Risk-Free Bet (750 ⭐)
3. VIP Status - 1 week (1000 ⭐)
4. Custom Badge (1500 ⭐)
5. Premium Analytics (2000 ⭐)

Type !redeem <number> to claim`;
    }

    static async processAchievement(userId, achievement) {
        const rewards = {
            xp: achievement.xpReward,
            items: achievement.items,
            badges: achievement.badges
        };

        await this.grantRewards(userId, rewards);
        return this.formatAchievementMessage(achievement, rewards);
    }

    static async updateUserProgress(userId, action) {
        const progressUpdates = await this.calculateProgressUpdates(userId, action);
        const notifications = [];

        if (progressUpdates.levelUp) {
            notifications.push(this.getLevelUpMessage(progressUpdates.newLevel));
        }

        if (progressUpdates.questComplete) {
            notifications.push(this.getQuestCompleteMessage(progressUpdates.quest));
        }

        if (progressUpdates.achievementUnlocked) {
            notifications.push(this.getAchievementMessage(progressUpdates.achievement));
        }

        return notifications;
    }
}

module.exports = GamificationService; 