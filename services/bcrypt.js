const bcrypt = require('bcrypt')

async function hashPassword(plainPassword){
    saltRound = 10
    try{
        const hashedPassword =  await bcrypt.hash(plainPassword , saltRound)
        return hashedPassword;
    }
    catch(err){
        return null;
    }
   
}

module.exports = {hashPassword}