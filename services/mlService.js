const tf = require('@tensorflow/tfjs-node');
const { loadModel, saveModel } = require('../utils/modelUtils');

class MLService {
    static async predictMatchOutcome(match) {
        const model = await loadModel('match-prediction');
        const features = this.prepareMatchFeatures(match);
        
        const prediction = await model.predict(features).array();
        return this.formatPrediction(prediction);
    }

    static async analyzeOddsMovement(historicalOdds) {
        const model = await loadModel('odds-movement');
        const features = this.prepareOddsFeatures(historicalOdds);
        
        const prediction = await model.predict(features).array();
        return this.formatOddsAnalysis(prediction);
    }

    static async detectBettingPatterns(userHistory) {
        const model = await loadModel('pattern-detection');
        const features = this.prepareBettingFeatures(userHistory);
        
        const patterns = await model.predict(features).array();
        return this.formatPatternAnalysis(patterns);
    }

    static async trainModels(trainingData) {
        // Train different models for different predictions
        await this.trainMatchPredictionModel(trainingData.matches);
        await this.trainOddsMovementModel(trainingData.odds);
        await this.trainPatternDetectionModel(trainingData.patterns);
    }
}

module.exports = MLService; 