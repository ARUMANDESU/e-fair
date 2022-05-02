const express = require('express');
const router = express()
const User = require("../modules/User")
const Role = require("../modules/Role")
const controller =require("./authController")
const {check} = require("express-validator")
const authMiddleware = require("../middlewaree/authMiddleware")
const roleMiddleware= require("../middlewaree/roleMiddleware")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const findUser=(req,res)=>{
    try{
        const token=req.cookies.auth.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "User not authorized"})
        }

        return User.findById(jwt.verify(token, secret)._id)
    }
    catch (e){

    }
    return null
}

router.use(cookieParser())

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

router
    .get('/login', (req, res) => {
        const user= findUser(req,res)
        let auth=user?true:false;
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
    const user= findUser(req,res)
    let auth=user?true:false;
    res.render("index",{auth:auth,})
})
router.get('/about', (req, res) => {
    const user= findUser(req,res)
    let auth=user?true:false;
    res.render('aboutUs',{auth:auth,})
})
router.get('/catalog', (req, res) => {
    const user= findUser(req,res)
    let auth=user?true:false;
    res.render("catalog",{auth:auth,})
})
router.get('/user/profile/:id',(req, res) => {
    const user= findUser(req,res)
    let auth=user?true:false;
    res.render("personalArea",{
        auth:auth,
        edit:false,
        avatarUrl:user.avatarUrl,
        username:user.username,
        fullname:user.fullname,
        phoneNumber:user.phoneNumber,
        address:user.address,
        email:user.email,
        description:user.description,
        twitterUrl:user.twitterUrl,
        instagramUrl:user.instagramUrl,
        facebookUrl:user.facebookUrl,
        comments:[],
    })
})
router
    .get('/user/edit',(req, res) => {
        const user= findUser(req,res)
        let auth=user?true:false;
        res.render("personalArea",{
            auth:auth,
            edit:true,
            avatarUrl:user.avatarUrl,
            username:user.username,
            fullname:user.fullname,
            phoneNumber:user.phoneNumber,
            address:user.address,
            email:user.email,
            description:user.description,
            twitterUrl:user.twitterUrl,
            instagramUrl:user.instagramUrl,
            facebookUrl:user.facebookUrl,
            comments:[],
        })
    })
    .post('/user/edit',(req, res) => {

    })

module.exports= router;