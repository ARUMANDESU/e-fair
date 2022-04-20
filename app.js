const express = require('express');
const req = require('express/lib/request');
const app = express()
const mongoose = require('mongoose');
const pageRouter =require("./routers/pageRouter")
const authRouter =require("./routers/authRouter")

app.set('view engine', 'ejs')

const port = process.env.PORT || 3000
const db = 'mongodb+srv://mauk14:0qPTqT3sErKJD2Xe@cluster0.odtn9.mongodb.net/database(main)?retryWrites=true&w=majority'

app.use("/",pageRouter, authRouter)
app.use(express.static('public'))

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch(error => console.log(error))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use((req,res)=>{
    res.render('error')
})