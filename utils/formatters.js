class MessageFormatter {
    static formatStats(stats) {
        return `
📊 *Your Betting Statistics*

Total Bets: ${stats.totalBets}
Win Rate: ${stats.winRate}%
Profit/Loss: R${stats.profitLoss}

🏆 Best Performing Sport: ${stats.bestPerformingSport}
🎯 Favorite Markets: ${stats.favoriteMarkets.join(', ')}
`;
    }

    static formatBalance(balance) {
        return `
💰 *Your Balance*

Available: R${balance.available}
Pending Bets: R${balance.pending}
Total: R${balance.total}

Reply with:
- !deposit to add funds
- !withdraw to cash out
`;
    }

    static formatBetSlip(betSlip) {
        let message = '🎯 *Your Bet Slip*\n\n';
        betSlip.forEach((bet, index) => {
            message += `${index + 1}. ${bet.event}\n`;
            message += `   Selection: ${bet.selection}\n`;
            message += `   Odds: ${bet.odds}\n\n`;
        });
        message += `Total Odds: ${betSlip.totalOdds}\n`;
        message += `Potential Win: R${betSlip.potentialWin}\n\n`;
        message += 'Reply with:\n';
        message += '- !place <amount> to place bet\n';
        message += '- !clear to clear slip';
        return message;
    }
}

module.exports = MessageFormatter; 