const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res,next){
        const token = req.header('authentication-token');    

        // test split bearer token
        const trySplit = token.split(" ")
        console.log(trySplit)

        if(!token) return res.status(401).send('Access denied, No Token Provided.')
        
        try {
            // verify the json token
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded;
            next();
        }
        catch (ex){
            res.status(400).send('invalid token.');
        }
}

module.exports = auth;