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
    .get('/login', (req, res) => {
    //     auth=user?true:false;
        console.log(auth)
    res.render("login",{auth:auth,})

    })
    .post('/login', controller.login)

router
    .get('/register', (req, res) => {
    res.render("register",{auth:"safs",})
    })
    .post('/register', [
        check('username',"Username cannot be empty").notEmpty(),
        check('password',"Password must be more than 7 and less than 15 symbols").isLength({min:7,max:15})
    ],controller.register)

router
    .get("/users" , roleMiddleware(["ADMIN"]),controller.getUsers);

router.get('/', (req, res) => {

    res.redirect("/home");
})

router.get('/home', (req, res) => {

    res.render("index",{auth:auth,})
})
router.get('/about', (req, res) => {

    res.render('aboutUs',{auth:auth,})
})
router.get('/catalog', (req, res) => {

    res.render("catalog",{auth:auth,})
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