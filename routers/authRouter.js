const express = require('express');
const router = express()
const User = require("../modules/User")
const Role = require("../modules/Role")
const controller =require("./authController")
const {check, checkSchema} = require("express-validator")
const authMiddleware = require("../middlewaree/authMiddleware")
const roleMiddleware= require("../middlewaree/roleMiddleware")
const auth =require("../middlewaree/auth")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

router.use(cookieParser())

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));


router
    .get('/login',auth() , (req, res) => {
    res.render("login",{auth:res.user,})

    })
    .post('/login', controller.login)

router
    .get('/register',auth(), (req, res) => {
    res.render("register",{auth:res.user,})
    })
    .post('/register', [
        check('username',"Username cannot be empty").notEmpty(),
        check('password',"Password must be more than 7 and less than 15 symbols").isLength({min:7,max:15})
    ],controller.register)

router
    .get("/users"  ,controller.getUsers);

router.get('/',auth() , (req, res) => {
    res.redirect("/home");
})

router.get('/home',auth() , (req, res) => {

    res.render("index",{auth:res.user,})
})
router.get('/about',auth() , (req, res) => {

    res.render('aboutUs',{auth:res.user,})
})
router.get('/catalog',auth() ,(req, res) => {

    res.render("catalog",{auth:res.user,})
})
router.get('/user/profile/:id',auth(),async (req, res) => {
    res.render("personalArea",{
        auth:res.user,
        edit:false,
        pavatarUrl:res.user.avatarUrl,
        pusername:res.user.username,
        pfullname:res.user.fullname,
        pphoneNumber:res.user.phoneNumber,
        paddress:res.user.address,
        pemail:res.user.email,
        pdescription:res.user.description,
        ptwitterUrl:res.user.twitterUrl,
        pinstagramUrl:res.user.instagramUrl,
        pfacebookUrl:res.user.facebookUrl,
        pcomments:[],
    })




})
router
    .get('/user/edit',auth(),(req, res) => {
        res.render("personalArea",{
            auth:res.user,
            edit:true,
            pavatarUrl:res.user.avatarUrl,
            pusername:res.user.username,
            pfullname:res.user.fullname,
            pphoneNumber:res.user.phoneNumber,
            paddress:res.user.address,
            pemail:res.user.email,
            pdescription:res.user.description,
            ptwitterUrl:res.user.twitterUrl,
            pinstagramUrl:res.user.instagramUrl,
            pfacebookUrl:res.user.facebookUrl,
            pcomments:[],
        })
    })
    .post('/user/edit',(req, res) => {

    })

module.exports= router;