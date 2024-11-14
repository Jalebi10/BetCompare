const { Configuration, OpenAIApi } = require('openai');
const TensorFlow = require('@tensorflow/tfjs-node');
const User = require('../models/user');

class AIService {
    constructor() {
        this.openai = new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        }));
    }

    static async analyzeBettingPattern(userId) {
        const user = await User.findById(userId)
            .populate('bettingHistory');
        
        // Analyze user's betting patterns using TensorFlow
        const pattern = await this.runPatternAnalysis(user.bettingHistory);
        
        return {
            riskLevel: pattern.riskScore,
            preferredMarkets: pattern.topMarkets,
            successfulStrategies: pattern.workingStrategies,
            recommendations: pattern.recommendations
        };
    }

    static async getPredictions(match) {
        try {
            const completion = await this.openai.createCompletion({
                model: "gpt-4",
                messages: [{
                    role: "system",
                    content: "You are an expert sports betting analyst."
                }, {
                    role: "user",
                    content: `Analyze this match and provide betting insights: ${match}`
                }],
                temperature: 0.7,
                max_tokens: 200
            });

            return this.formatPrediction(completion.data.choices[0].message);
        } catch (error) {
            console.error('AI Prediction Error:', error);
            return null;
        }
    }

    static async getPersonalizedAdvice(userId) {
        const user = await User.findById(userId)
            .populate('bettingHistory');
        
        const userContext = this.prepareUserContext(user);
        
        try {
            const completion = await this.openai.createCompletion({
                model: "gpt-4",
                messages: [{
                    role: "system",
                    content: "You are a personal betting advisor focused on responsible gambling."
                }, {
                    role: "user",
                    content: `Analyze this betting history and provide personalized advice: ${JSON.stringify(userContext)}`
                }],
                temperature: 0.7,
                max_tokens: 300
            });

            return this.formatAdvice(completion.data.choices[0].message);
        } catch (error) {
            console.error('AI Advice Error:', error);
            return null;
        }
    }

    static async detectValueBets(odds) {
        // Use TensorFlow to analyze odds and detect value bets
        const model = await this.loadValueBetModel();
        const prediction = await model.predict(this.prepareOddsData(odds));
        
        return this.formatValueBets(prediction);
    }

    static async generateMatchAnalysis(match) {
        try {
            const completion = await this.openai.createCompletion({
                model: "gpt-4",
                messages: [{
                    role: "system",
                    content: "You are an expert sports analyst."
                }, {
                    role: "user",
                    content: `Provide detailed analysis for: ${match}`
                }],
                temperature: 0.7,
                max_tokens: 400
            });

            return this.formatAnalysis(completion.data.choices[0].message);
        } catch (error) {
            console.error('Match Analysis Error:', error);
            return null;
        }
    }

    // Helper methods for AI model management
    static async trainModel(historicalData) {
        const model = await this.createModel();
        const { features, labels } = this.prepareTrainingData(historicalData);
        
        await model.fit(features, labels, {
            epochs: 100,
            validationSplit: 0.2
        });
        
        return model;
    }

    static async updateModelWithNewData(newData) {
        const model = await this.loadLatestModel();
        const { features, labels } = this.prepareTrainingData(newData);
        
        await model.fit(features, labels, {
            epochs: 10,
            validationSplit: 0.2
        });
        
        await this.saveModel(model);
    }
}

module.exports = AIService; 