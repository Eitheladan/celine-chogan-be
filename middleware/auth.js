const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;
        req.auth = {
            userId,
            userRole,
            userEmail,
        };
        if (userEmail) {
            next();
        } else {
            console.log('invalide user');
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};