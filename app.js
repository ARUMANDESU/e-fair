const express = require('express');
const req = require('express/lib/request');
const app = express()
const mongoose = require('mongoose');
const authRouter =require("./routers/authRouter")
const {db}= require(__dirname+"/config")
app.set('view engine', 'ejs')

const port = process.env.PORT || 3000

app.use("/", authRouter)
app.use(express.static('public'))

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch(error => console.log(error))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use((req,res)=>{
    res.render('error',{auth:"safs",})
})