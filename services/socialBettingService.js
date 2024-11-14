class SocialBettingService {
    static async createBettingPool(creator, details) {
        return `
👥 *New Betting Pool Created*

Event: ${details.event}
Pool Amount: R${details.amount}
Participants: 1/${details.maxParticipants}
Entry Fee: R${details.entryFee}

Rules:
- Winner takes ${details.winnerShare}%
- Second gets ${details.secondShare}%
- Third gets ${details.thirdShare}%

Join with !join ${details.poolId}`;
    }

    static async getBettingLeaderboard() {
        return `
🏆 *Weekly Leaderboard*

1. @JohnD 
   Wins: 12 | ROI: 156%
2. @BetKing
   Wins: 10 | ROI: 134%
3. @LuckyLuke
   Wins: 9 | ROI: 122%

Your Rank: #15
This Week's Profit: R1,200

Reply !compete to join next contest`;
    }

    static async shareBet(bet) {
        return `
📢 *Shared Bet*

${bet.user} is betting on:
${bet.selection}
Odds: ${bet.odds}
Confidence: ${bet.confidence}%

Copy this bet with !copy ${bet.id}`;
    }
} 