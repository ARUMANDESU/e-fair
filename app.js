const express = require('express')
const session = require("express-session");
const req = require('express/lib/request')
const app = express()
const mongoose = require('mongoose')
const authRouter =require("./routers/router")
const auth = require("./middlewaree/auth")
const dotenv =require("dotenv")
const authGoogle = require('./authGoogle')
const passport = require('passport');
dotenv.config()

app.set('view engine', 'ejs')

const port = process.env.PORT || 3000

app.use("/", authRouter)
app.use(express.static('public'))
app.use(session({secret:"cats"}));
app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(process.env.db)
    .then((res) => console.log('Connected to DB'))
    .catch(error => console.log(error))


app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

app.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/auth/db',
        failureRedirect: '/error'
    })
)    


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(auth(),(req,res)=>{
    const avatar= res.user ? res.user.avatarUrl:""
    res.render('error',{auth:res.user,avatar:avatar,})
})