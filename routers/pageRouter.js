const express = require('express');
const router = express()



router.get('/', (req, res) => {
    res.redirect("/home");
})

router.get('/home', (req, res) => {
    res.render("index")
})
router.get('/about', (req, res) => {
    res.render('aboutUs')
})
router.get('/catalog', (req, res) => {
    res.render("catalog")
})


module.exports =router;