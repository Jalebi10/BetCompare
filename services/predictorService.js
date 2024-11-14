class PredictorService {
    static async getDetailedPrediction(match) {
        return `
🤖 *AI Match Analysis*

${match.homeTeam} vs ${match.awayTeam}

Win Probability:
Home: 45% 📈
Draw: 28% ↔️
Away: 27% 📉

Key Factors:
- Home team won last 3 matches
- Away team missing key striker
- Weather conditions favor home team

Suggested Bet: Home Win + Over 2.5 goals`;
    }
} 