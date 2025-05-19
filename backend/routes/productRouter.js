const ensureAuthenticated = require('../middleware/authMiddleware');


const router = require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{

    console.log('getting req from products');
    
    res.status(200).json([
    { 
       name: 'mobile',
        price: '10000'
    },

    { 
        name: 'tv',
        price: '20000'
    }

    ])
})


module.exports = router