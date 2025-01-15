const jwt = require("jsonwebtoken")
require('dotenv').config()
const secretKey = process.env.SECRET_KEY


// setUser function creates a token and return it 
function setUser(data){
    
    const payload = { email: data.email, username: data.name };
    const options = { expiresIn: '1h' }; 

    // Generating the token
    const token = jwt.sign(payload, secretKey, options);
    console.log('Generated Token:', token);

}
data = {
    name :'hi',
    email : "@.com"
}
setUser(data)