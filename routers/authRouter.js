const express = require('express');
const router = express()
const controller =require("./authController")
const {check} = require("express-validator")
const authMiddleware = require("../middlewaree/authMiddleware")
const roleMiddleware= require("../middlewaree/roleMiddleware")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

router
    .get('/login', (req, res) => {
    res.render("login")})
    .post('/login', controller.login)

router
    .get('/register', (req, res) => {
    res.render("register")})
    .post('/register', [
        check('username',"Username cannot be empty").notEmpty(),
        check('password',"Password must be more than 7 and less than 15 symbols").isLength({min:7,max:15})
    ],controller.register)

router.get("/users" , roleMiddleware(["ADMIN"]),controller.getUsers);

module.exports= router;