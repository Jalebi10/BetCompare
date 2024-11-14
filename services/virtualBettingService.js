class VirtualBettingService {
    static async startVirtualAccount() {
        return `
🎮 *Virtual Betting Account Created*

Starting Balance: R10,000 (virtual)
Duration: 7 days
Goal: Learn betting strategies risk-free

Features:
- Real odds, virtual money
- Performance tracking
- Strategy recommendations
- Risk-free learning

Start with !vbet to place virtual bets`;
    }

    static async getVirtualPerformance(userId) {
        return `
📊 *Virtual Account Performance*

Starting: R10,000
Current: R${virtualBalance}
ROI: ${roi}%

Learning Points:
- Best performing markets
- Risk management score
- Suggested improvements

Convert to real account with !convert`;
    }
} 