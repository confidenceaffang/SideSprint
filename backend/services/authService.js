const jwt = require('jsonwebtoken');

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '7d'
    });
};

module.exports = {
    createToken
};