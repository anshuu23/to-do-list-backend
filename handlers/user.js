const USER = require("../models/schema")
const {hashPassword , unhashAndCheck} = require("../services/bcrypt")
const {setUser} = require("../services/auth")

/* handelUserCreateAccount function handels req came from '/createAccount' route. 
 it creates account. if account already exist, it sends err msg,
it then hashes password and return json web token if account is created */

async function handelUserCreateAccount(req,res){

    const {name,email,password} = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({err:'missing requires fields'})
    }

    const hashedPassword = await hashPassword(password);
    

    if(!hashedPassword){
        return res.status(500).json({err:'internal server error'})
    }

    USER.create({
        name,email,password:hashedPassword
    })
    .then((data)=>{
        
        const token = setUser(data)
        
        
        return res.status(201).json({msg:`account created successfully, Use this token in headers`,token:token})
        
    })
    .catch((error)=>{
        console.log(error)
        return res.status(409).json({msg:"account with this email already exist"})
        
    })
    
}


/* handelUserLogin function handels req came from '/login' route. 
 it log-in to account. if account with thst email dosent exist, it sends err msg,
it then unhashes password and return json web token if password is correct */
async function handelUserLogin(req,res){
    const {email,password} = req.body;
    
    if( !email || !password){
        return res.status(400).json({err:'missing requires fields'})
    }

    try{
        const user = await  USER.findOne({email})
        

        if(!user){
            return res.status(400).json({err:'account with this email dosent exist'})
        }

        const hashedPassword =  user.password
        const isAuthenticUser = await unhashAndCheck(hashedPassword , password)

        if(!isAuthenticUser){
            return res.status(400).json({err:'wrong password'})
        }

        const token = setUser(user)
        
        return res.status(200).json({token:token , msg:'Use this token in headers'})


    }
    catch(err){
        console.log(err)
        return res.status(500).json({err:'internal server error'})
    }
    
}
module.exports = {handelUserCreateAccount , handelUserLogin}