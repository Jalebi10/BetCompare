const User = require('../models/user');
const Bet = require('../models/bet');
const RevenueService = require('./revenueService');

class ValuationService {
    static KEY_METRICS = {
        USER_VALUE: {
            ACQUISITION_COST: 50,      // R50 per user
            LIFETIME_VALUE: 1500,      // R1500 average
            RETENTION_RATE: 0.85       // 85% retention
        },
        MARKET_SHARE: {
            TOTAL_MARKET: 50000000,    // R50M monthly betting market
            TARGET_SHARE: 0.15         // 15% market share goal
        },
        GROWTH_RATES: {
            USERS: 0.25,               // 25% monthly user growth
            REVENUE: 0.35,             // 35% monthly revenue growth
            BETTING_VOLUME: 0.40       // 40% monthly volume growth`
        }
    };

    static async generateValuationReport() {
        const metrics = await this.calculateMetrics();
        const valuation = this.calculateValuation(metrics);
        
        return {
            userMetrics: {
                totalUsers: metrics.totalUsers,
                activeUsers: metrics.activeUsers,
                averageBetSize: metrics.avgBetSize,
                userGrowthRate: this.KEY_METRICS.GROWTH_RATES.USERS
            },
            financialMetrics: {
                monthlyRevenue: metrics.monthlyRevenue,
                projectedAnnualRevenue: metrics.monthlyRevenue * 12 * (1 + this.KEY_METRICS.GROWTH_RATES.REVENUE),
                operatingMargin: metrics.operatingMargin,
                revenueGrowth: this.KEY_METRICS.GROWTH_RATES.REVENUE
            },
            marketMetrics: {
                marketShare: metrics.marketShare,
                targetMarketShare: this.KEY_METRICS.MARKET_SHARE.TARGET_SHARE,
                competitivePosition: metrics.competitivePosition
            },
            technicalAssets: {
                aiCapabilities: true,
                multiLanguageSupport: true,
                apiIntegrations: metrics.integrations,
                dataAnalytics: true
            },
            strategicValue: {
                userBase: this.calculateUserBaseValue(metrics),
                technology: this.calculateTechnologyValue(metrics),
                marketPosition: this.calculateMarketPositionValue(metrics),
                growthPotential: this.calculateGrowthValue(metrics)
            },
            suggestedValuation: valuation
        };
    }

    static async generateAcquisitionPitch() {
        return `
🎯 *BetCompare Acquisition Opportunity*

Key Strengths:
1. Market Leadership
   - ${await this.getUserCount()} active users
   - ${await this.getMarketShare()}% market share
   - ${await this.getMonthlyGrowthRate()}% monthly growth

2. Technical Innovation
   - AI-powered predictions
   - Multi-language support
   - Advanced analytics
   - WhatsApp integration

3. Strategic Advantages
   - User acquisition cost: R${this.KEY_METRICS.USER_VALUE.ACQUISITION_COST}
   - User lifetime value: R${this.KEY_METRICS.USER_VALUE.LIFETIME_VALUE}
   - Retention rate: ${this.KEY_METRICS.USER_VALUE.RETENTION_RATE * 100}%

4. Growth Potential
   - Market expansion ready
   - White label solutions
   - API monetization
   - Data insights

5. Competitive Edge
   - Unique AI algorithms
   - Multi-betting site integration
   - Social betting features
   - Gamification system

6. Revenue Streams
   - Commission model
   - Premium subscriptions
   - Affiliate partnerships
   - Data monetization

Integration Benefits:
- Instant market expansion
- Technology acquisition
- User base acquisition
- Competitive advantage

Contact for detailed valuation report.`;
    }

    static async calculateAcquisitionSynergies(acquirerProfile) {
        return {
            marketExpansion: this.calculateMarketSynergy(acquirerProfile),
            technologicalGain: this.calculateTechSynergy(acquirerProfile),
            operationalEfficiency: this.calculateOperationalSynergy(acquirerProfile),
            competitiveAdvantage: this.calculateCompetitiveSynergy(acquirerProfile)
        };
    }

    static async generateDueDiligencePackage() {
        return {
            financials: await this.getFinancialMetrics(),
            technology: await this.getTechnologyAssessment(),
            market: await this.getMarketAnalysis(),
            operations: await this.getOperationalMetrics(),
            compliance: await this.getComplianceStatus(),
            growth: await this.getGrowthProjections()
        };
    }
}

module.exports = ValuationService; 