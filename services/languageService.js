const { Configuration, OpenAIApi } = require('openai');
const { LanguageDetector } = require('natural');
const translate = require('@vitalets/google-translate-api');

class LanguageService {
    static SUPPORTED_LANGUAGES = {
        'en': 'English',
        'af': 'Afrikaans',
        'zu': 'Zulu',
        'xh': 'Xhosa',
        'st': 'Sesotho',
        'tn': 'Setswana',
        'nso': 'Sepedi',
        'ts': 'Xitsonga',
        'ss': 'siSwati',
        've': 'Tshivenda',
        'nr': 'isiNdebele'
    };

    constructor() {
        this.detector = new LanguageDetector();
        this.openai = new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        }));
    }

    static async detectLanguage(text) {
        const detectedLang = this.detector.detect(text);
        return detectedLang[0][0]; // Returns most likely language
    }

    static async translateMessage(text, targetLang) {
        try {
            const result = await translate(text, { to: targetLang });
            return result.text;
        } catch (error) {
            console.error('Translation Error:', error);
            return text; // Return original text if translation fails
        }
    }

    static async getLocalizedResponse(message, userId) {
        const user = await User.findById(userId);
        const preferredLang = user.preferences.language || 'en';
        
        if (preferredLang === 'en') return message;
        
        return this.translateMessage(message, preferredLang);
    }

    static async handleMultilingualQuery(text, targetLang) {
        try {
            const completion = await this.openai.createCompletion({
                model: "gpt-4",
                messages: [{
                    role: "system",
                    content: `You are a multilingual betting assistant. Respond in ${SUPPORTED_LANGUAGES[targetLang]}.`
                }, {
                    role: "user",
                    content: text
                }],
                temperature: 0.7
            });

            return completion.data.choices[0].message;
        } catch (error) {
            console.error('Multilingual Processing Error:', error);
            return null;
        }
    }

    static getWelcomeMessage(lang) {
        const messages = {
            en: "Welcome to BetCompare! Choose your language:",
            af: "Welkom by BetCompare! Kies jou taal:",
            zu: "Wamkelekile ku-BetCompare! Khetha ulimi lwakho:",
            xh: "Wamkelekile ku-BetCompare! Khetha ulwimi lwakho:",
            st: "O amohelehile ho BetCompare! Kgetha puo ya hao:",
            tn: "O amogelwa mo BetCompare! Tlhopha puo ya gago:",
            nso: "O amogetšwe go BetCompare! Kgetha polelo ya gago:",
            ts: "U amukeriwa eka BetCompare! Hlawula ririmi ra wena:",
            ss: "Wemukelekile ku-BetCompare! Khetha lulwimi lwakho:",
            ve: "Vho ṱanganedzwa kha BetCompare! Kha vha nange luambo lwavho:",
            nr: "Wamukelekile ku-BetCompare! Khetha ilimi lakho:"
        };
        
        return messages[lang] || messages.en;
    }
}

module.exports = LanguageService; 