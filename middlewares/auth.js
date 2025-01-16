const {getUser} = require("../services/auth") 

// checks if token is send. if yes , it verifys token and allow user to access route 
function authenticateUser(req, res, next){

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    
    const user = getUser(token);

    if(!user){
        return res.status(401).json({err:"invalid token, pls log-in again"})
    }

    req.user = user;

    next();

}

module.exports = {authenticateUser}