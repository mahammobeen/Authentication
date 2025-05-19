const UserModel = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async(req,res)=>{
    try{
        console.log('recieved signup request');
    
        
     const {name,email,password} = req.body;
     console.log("req body", req.body);
     
     const user = await UserModel.findOne({email})
     console.log('user found', user);
     
     if(user){
        console.log('user already exists');
        
        return res.status(409).json({
            
            message: 'user already exists'
        })
     }
     console.log("hashing pass");
     
     const hashedPassword = await bcrypt.hash(password, 10)
const userModel = new UserModel({name,email,password: hashedPassword})
console.log("user model created" , userModel);

     await userModel.save()

     res.status(201).json({
        success:true,
        message: 'user created successfully'
     })
    }
    catch(e){
        console.log('signup error' , e);
        
 res.status(500).json({
        success:false,
        message: 'signup failed'
     })
    }
}


const login = async(req,res)=>{
    try{
        console.log('recieved login request');
    
        
     const {email,password} = req.body;
     console.log("req body", req.body);
     
     const user = await UserModel.findOne({email})
     console.log('user found', user);
     
     if(!user){
        console.log('user is not signup');
        
        return res.status(403).json({
            message: ' auth failed email or password is wrong '
        })
     }
     const isPassEqual = await bcrypt.compare(password, user.password )
     if(!isPassEqual){
         return res.status(403).json({
            message: ' auth failed email or password is wrong '
        })
     }

     const jwtToken = jwt.sign(
        {email : user.email, _id:user._id},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}

     )



     res.status(200).json({
        success:true,
        message: 'login successfully',
        jwtToken,
        email,
        name: user.name
     })
    }
    catch(e){
        console.log('login error' , e);
        
 res.status(500).json({
        success:false,
        message: 'login failed'
     })
    }
}


module.exports = {
    signup, login
}