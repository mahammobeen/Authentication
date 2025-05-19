require('dotenv').config();
const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('./routes/router')
const productROuter = require('./routes/productRouter')


 const connectToDB = require('./models/db')

 connectToDB()

 app.use(express.json())

// app.use(bodyParser.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/products', productROuter)




const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    
})