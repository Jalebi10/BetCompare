class ChallengeService {
    static async createChallenge(user, details) {
        return `
🏆 *Betting Challenge*

${user.name} challenges you!
Stake: R${details.amount}
Match: ${details.match}
Prediction: ${details.prediction}

Winner takes all! 
Accept with !accept ${details.challengeId}`;
    }
} 