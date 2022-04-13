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
    res.sendFile(__dirname+"/src/aboutUs.html")
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))