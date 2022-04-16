const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

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
app.get('/reg', (req, res) => {
    res.render("reg")
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use((req,res)=>{
    res.render('error')
})