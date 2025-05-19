const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req,res,next)=>{
    
    
    
    const auth = req.headers['authorization']
   
    if(!auth){
        return res.status(403).json({
            message: 'unauthorize , jwt token is require'
        })
    }
    try{
   const decoded = jwt.verify(auth, process.env.SECRET_KEY)
   req.user = decoded
   console.log('login details of the user', req.user);
   next()
    }
    catch(e){
          return res.status(401).json({
            message: 'unauthorize , jwt token is wrong'
        })
    }
}

module.exports = ensureAuthenticated