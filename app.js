const express = require('express')
const bodyParser = require('body-parser')
const initDB = require('./models/db')
let userRouter = require('./router/user')
const app = express()

initDB.createUserTable()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use('/',userRouter)

app.listen(8000,()=>{
    console.log(`Server started ` );
    
})