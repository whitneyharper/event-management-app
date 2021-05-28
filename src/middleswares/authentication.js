const jwt = require('jsonwebtoken');
const secret = 'THISisAsecret';

exports.authenticateUser = (req, res, next) => {
    //CHECK IF THERE IS A AUTHORIZATION TOKEN
    if(!req.headers.authorization) {
        return res.status(401).json({message: `authorization header required`})
    }
    let splittedHeader = req.headers.authorization.split(' ');
    if(splittedHeader[0] !== "Bearer") {
        return res.status(401).json({message: `authorization format is Bearer <token>`})
    }
    let token = splittedHeader[1];
    //DECODE TOKEN
    jwt.verify(token, secret, (err, decodedToken) => {
        if(err) {return res.status(500).json({err})}
    //CHECK IF VALID
        if(!decodedToken) {
            return res.status(401).json({message: `invalid authorization token, please login`})
        }
    //ALLOW USER TO CONTINUE WITH REQUEST
        console.log(decodedToken);
        req.user = decodedToken;
        next()
    })
}

exports.checkIfAdmin = (req, res, next) => {
    if(req.user.role !== "admin") {
        return res.status(401).json({message: `this route is restricted to admin users`})
    }
    return next()
}
