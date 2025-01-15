const USER = require("../models/schema")
const {hashPassword} = require("../services/bcrypt")

async function handelUserCreateAccount(req,res){

    const {name,email,password} = req.body;
    console.log(name,email,password)
    if(!name || !email || !password){
        return res.status(400).json({err:'missing requires fields'})
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword)

    if(!hashedPassword){
        return res.status(500).json({err:'internal server error'})
    }

    USER.create({
        name,email,password:hashedPassword
    })
    .then((data)=>{
        console.log(data)
        const token=1223
        res.cookie('jwt' , token)
        return res.status(201).json({msg:"account created successfully"})
        
    })
    .catch(()=>{
        console.log("error")
        return res.status(409).json({msg:"account with this email already exist"})
        
    })
    
}
function handelUserLogin(){

}
module.exports = {handelUserCreateAccount , handelUserLogin}