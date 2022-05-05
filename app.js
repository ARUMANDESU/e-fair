const express = require('express')
const req = require('express/lib/request')
const app = express()
const mongoose = require('mongoose')
const authRouter =require("./routers/router")
const auth = require("./middlewaree/auth")
const dotenv =require("dotenv")
dotenv.config()

app.set('view engine', 'ejs')

const port = process.env.PORT || 3000

app.use("/", authRouter)
app.use(express.static('public'))

mongoose
    .connect(process.env.db)
    .then((res) => console.log('Connected to DB'))
    .catch(error => console.log(error))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(auth(),(req,res)=>{
    const avatar= res.user ? res.user.avatarUrl:""
    res.render('error',{auth:res.user,avatar:avatar,})
})