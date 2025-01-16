const bcrypt = require('bcrypt')

//hashes password
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

// unhashes password
async function unhashAndCheck(hashedPassword , plainPassword){

    try{
        const isPassswordCorrect = bcrypt.compare(plainPassword , hashedPassword)
        return isPassswordCorrect
    }
    catch(err){
        return null;
    }

}

module.exports = {hashPassword , unhashAndCheck}