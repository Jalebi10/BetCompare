class MenuService {
    static getMainMenu() {
        return `
🎯 *Welcome to BetCompare!*

Choose a sport to bet on:

1️⃣ Soccer ⚽
2️⃣ Horse Racing 🏇
3️⃣ Rugby 🏉
4️⃣ Cricket 🏏
5️⃣ Tennis 🎾
6️⃣ Basketball 🏀

📊 My Stats
💰 My Balance
❓ Help

Reply with a number or command to continue.`;
    }

    static getSoccerMenu() {
        return `
⚽ *Soccer Betting*

Choose an option:

1️⃣ Today's Matches
2️⃣ Premier League
3️⃣ PSL
4️⃣ Champions League
5️⃣ Live Matches
6️⃣ Popular Bets
7️⃣ Back to Main Menu

Reply with a number to continue.`;
    }

    static getHorseRacingMenu() {
        return `
🏇 *Horse Racing*

Choose an option:

1️⃣ Today's Races
2️⃣ Upcoming Races
3️⃣ Track Selection
4️⃣ Popular Bets
5️⃣ Live Racing
6️⃣ Results
7️⃣ Back to Main Menu

Reply with a number to continue.`;
    }

    static getLanguageMenu() {
        return `
🌍 *Choose Your Language / Khetha Ulimi Lwakho*

1. English
2. Afrikaans
3. isiZulu
4. isiXhosa
5. Sesotho
6. Setswana
7. Sepedi
8. Xitsonga
9. siSwati
10. Tshivenda
11. isiNdebele

Reply with: !language <code>
Example: !language zu for isiZulu`;
    }

    static async getMatchesByCompetition(competition) {
        // Fetch real-time matches from betting sites
        const matches = await this.fetchMatches(competition);
        
        let menu = `*${competition} Matches*\n\n`;
        matches.forEach((match, index) => {
            menu += `${index + 1}. ${match.homeTeam} vs ${match.awayTeam}\n`;
            menu += `   🕒 ${match.time}\n`;
            menu += `   📊 Odds: ${match.odds}\n\n`;
        });
        
        menu += '\nReply with match number to see betting options.';
        return menu;
    }
}

module.exports = MenuService; 