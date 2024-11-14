const User = require('../models/user');

class SessionManager {
    static sessions = new Map();

    static async getSession(phoneNumber) {
        if (!this.sessions.has(phoneNumber)) {
            const user = await User.findOne({ phoneNumber }) || await this.createUser(phoneNumber);
            this.sessions.set(phoneNumber, {
                userId: user._id,
                currentMenu: 'main',
                lastActive: new Date(),
                selectedSport: null,
                selectedMatch: null,
                betSlip: []
            });
        }
        return this.sessions.get(phoneNumber);
    }

    static async createUser(phoneNumber) {
        const user = new User({
            phoneNumber,
            verificationStatus: 'pending'
        });
        await user.save();
        return user;
    }

    static updateSession(phoneNumber, updates) {
        const session = this.sessions.get(phoneNumber);
        this.sessions.set(phoneNumber, {
            ...session,
            ...updates,
            lastActive: new Date()
        });
    }

    static clearOldSessions() {
        const timeout = 30 * 60 * 1000; // 30 minutes
        for (const [phoneNumber, session] of this.sessions.entries()) {
            if (new Date() - session.lastActive > timeout) {
                this.sessions.delete(phoneNumber);
            }
        }
    }
}

// Clean up old sessions every hour
setInterval(() => SessionManager.clearOldSessions(), 60 * 60 * 1000);

module.exports = SessionManager; 