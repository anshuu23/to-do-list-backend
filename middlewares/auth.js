const {getUser} = require("../services/auth") 
function authenticateUser(req, res, next){

    const jwt = req.cookie;
    if(!jwt){
        return res.status(400).end("pls log in to access this page")
    }

    const user = getUser(jwt);

    if(!user){
        return res.status(401).end("invalid token, pls log-in again")
    }

    req.user = user;

    next();

}

module.exports = {authenticateUser}