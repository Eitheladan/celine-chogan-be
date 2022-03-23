const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        console.log('je décode')
        const token = true;
        console.log(token);
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log(decodedToken);
        const userId = decodedToken.userId;
        const userRole = decodedToken.userRole;
        const userEmail = decodedToken.userEmail;
        if (token == true) {
            console.log("C'est bon tu passe");
            next();
        } else {
            console.log('invalide user');
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
        console.log("Erreur")
    }
};