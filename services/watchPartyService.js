class WatchPartyService {
    static async createWatchParty(match) {
        return `
🎉 *Live Watch Party*

Match: ${match.homeTeam} vs ${match.awayTeam}
Time: ${match.time}

Features:
- Live chat with other bettors
- Real-time odds updates
- Live stats and analysis
- Group betting pools
- Live commentary

Join with !watch ${match.id}`;
    }
} 