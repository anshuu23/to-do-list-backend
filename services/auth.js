const jwt = require("jsonwebtoken")
require('dotenv').config()
const secretKey = process.env.SECRET_KEY


// setUser function creates a token and return it 
function setUser(data){
    console.log(data)
    const payload = { 
                    email: data.email, 
                    username: data.name,
                    id: data._id
    };
    const options = { expiresIn: '1h' }; 

    // Generating the token
    const token = jwt.sign(payload, secretKey, options);
    return token

}

function getUser(token){
    try{
        const user = jwt.verify(token, secretKey)
        return user;
    }
    catch(err){
        return null
    }
}

module.exports = {setUser, getUser}