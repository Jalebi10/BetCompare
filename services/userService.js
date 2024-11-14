const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotificationService = require('./notificationService');
const ResponsibleGamblingService = require('./responsibleGamblingService');

class UserService {
    static async registerUser(phoneNumber, initialData = {}) {
        try {
            // Check if user already exists
            let user = await User.findOne({ phoneNumber });
            
            if (user) {
                return {
                    success: false,
                    message: 'User already exists'
                };
            }

            // Create new user
            user = new User({
                phoneNumber,
                name: initialData.name,
                email: initialData.email,
                verificationStatus: 'pending',
                preferences: {
                    language: initialData.language || 'en',
                    notifications: {
                        odds: true,
                        results: true,
                        promotions: false
                    }
                }
            });

            await user.save();

            // Start verification process
            await this.initiateVerification(user);

            return {
                success: true,
                user,
                message: 'Registration successful. Verification required.'
            };
        } catch (error) {
            console.error('Registration Error:', error);
            return {
                success: false,
                message: 'Registration failed'
            };
        }
    }

    static async verifyUser(phoneNumber, verificationCode) {
        try {
            const user = await User.findOne({ phoneNumber });
            
            if (!user) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }

            // Verify the code (implement your verification logic)
            const isValid = await this.validateVerificationCode(user, verificationCode);
            
            if (!isValid) {
                return {
                    success: false,
                    message: 'Invalid verification code'
                };
            }

            user.verificationStatus = 'verified';
            await user.save();

            // Send welcome message
            await NotificationService.sendWelcomeMessage(user);

            return {
                success: true,
                message: 'Verification successful'
            };
        } catch (error) {
            console.error('Verification Error:', error);
            return {
                success: false,
                message: 'Verification failed'
            };
        }
    }

    static async updateUserProfile(userId, updates) {
        try {
            const user = await User.findById(userId);
            
            if (!user) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }

            // Update allowed fields
            const allowedUpdates = ['name', 'email', 'preferences'];
            Object.keys(updates).forEach(key => {
                if (allowedUpdates.includes(key)) {
                    user[key] = updates[key];
                }
            });

            await user.save();

            return {
                success: true,
                user,
                message: 'Profile updated successfully'
            };
        } catch (error) {
            console.error('Update Error:', error);
            return {
                success: false,
                message: 'Update failed'
            };
        }
    }

    static async handleDeposit(userId, amount, paymentDetails) {
        try {
            const user = await User.findById(userId);
            
            if (!user) {
                throw new Error('User not found');
            }

            // Process payment (implement your payment gateway logic)
            const payment = await this.processPayment(amount, paymentDetails);
            
            if (payment.success) {
                user.balance += amount;
                await user.save();

                await NotificationService.sendDepositConfirmation(user, amount);

                return {
                    success: true,
                    newBalance: user.balance,
                    message: 'Deposit successful'
                };
            }

            return {
                success: false,
                message: 'Payment failed'
            };
        } catch (error) {
            console.error('Deposit Error:', error);
            return {
                success: false,
                message: 'Deposit failed'
            };
        }
    }

    static async handleWithdrawal(userId, amount, withdrawalDetails) {
        try {
            const user = await User.findById(userId);
            
            if (!user) {
                throw new Error('User not found');
            }

            if (user.balance < amount) {
                return {
                    success: false,
                    message: 'Insufficient balance'
                };
            }

            // Process withdrawal (implement your withdrawal logic)
            const withdrawal = await this.processWithdrawal(amount, withdrawalDetails);
            
            if (withdrawal.success) {
                user.balance -= amount;
                await user.save();

                await NotificationService.sendWithdrawalConfirmation(user, amount);

                return {
                    success: true,
                    newBalance: user.balance,
                    message: 'Withdrawal successful'
                };
            }

            return {
                success: false,
                message: 'Withdrawal failed'
            };
        } catch (error) {
            console.error('Withdrawal Error:', error);
            return {
                success: false,
                message: 'Withdrawal failed'
            };
        }
    }

    static async getUserProfile(userId) {
        try {
            const user = await User.findById(userId)
                .populate('bettingHistory')
                .select('-__v');

            if (!user) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }

            return {
                success: true,
                user
            };
        } catch (error) {
            console.error('Profile Fetch Error:', error);
            return {
                success: false,
                message: 'Failed to fetch profile'
            };
        }
    }

    static getRegistrationMenu() {
        return `
📝 *Registration*

Welcome to BetCompare! Let's set up your account.

1️⃣ Enter your name
2️⃣ Verify your phone number
3️⃣ Set up deposit method
4️⃣ Choose your preferences

Reply with !register to start`;
    }
}

module.exports = UserService; 