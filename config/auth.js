const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
// define and export out auth middleware
module.exports = function(req, res, next) {
    // 1) grab the authorization header value from the request
    let token = req.get('Authorization');
    if(token) {
        // 2) take just the token portion from that value
        token = token.replace('Bearer ', '');
        // 3) verify and decode the token
        jwt.verify(token, SECRET, function(err, decoded) {
            if(err) next(err);
            // 4) grab the user portion from the token payload and add them
            // to req.user
            req.user = decoded.user;
            next();
        });
    } else {
        next();
    }
}