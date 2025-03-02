import User from '../mongoDB/models/User.js';
import { createToken } from '../services/authService.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
    try {
        const { email, password, role, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user in MongoDB
        const user = new User({
            email,
            name,
            role,
            onboardingCompleted: false
        });

        await user.save();

        // Generate JWT token
        const token = createToken(user._id);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                onboardingCompleted: user.onboardingCompleted
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const login = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists in MongoDB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate JWT token
        const token = createToken(user._id);

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                onboardingCompleted: user.onboardingCompleted
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { email, name, picture } = ticket.getPayload();

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            user = new User({
                email,
                name,
                profilePicture: picture,
                role: 'user',
                onboardingCompleted: false
            });
            await user.save();
        }

        // Generate JWT token
        const jwtToken = createToken(user._id);

        res.status(200).json({
            message: 'Google authentication successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                onboardingCompleted: user.onboardingCompleted
            },
            token: jwtToken
        });
    } catch (error) {
        console.error('Google authentication error:', error);
        res.status(500).json({ 
            message: 'Error during Google authentication',
            details: error.message
        });
    }
};

export {
    register,
    login,
    googleAuth
};