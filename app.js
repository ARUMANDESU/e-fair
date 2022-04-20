const express = require('express');
const app = express()
const mongoose = require('mongoose');

app.set('view engine', 'ejs')

const port = process.env.PORT || 3000

const db = 'mongodb+srv://mauk14:0qPTqT3sErKJD2Xe@cluster0.odtn9.mongodb.net/database(main)?retryWrites=true&w=majority'
app.use(express.static('public'))

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch(error => console.log(error))

app.get('/', (req, res) => {
    res.redirect("/home");
})

app.get('/home', (req, res) => {
    res.render("index")
})
app.get('/about', (req, res) => {
    res.render('aboutUs')
})
app.get('/login', (req, res) => {
    res.render("login")
})
app.get('/register', (req, res) => {
    res.render("reg")
})
app.get('/catalog', (req, res) => {
    res.render("catalog")
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use((req,res)=>{
    res.render('error')
})