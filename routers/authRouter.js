const express = require('express');
const router = express()
const User = require("../modules/User")
const Role = require("../modules/Role")
const controller =require("./authController")
const {check, checkSchema} = require("express-validator")
const authMiddleware = require("../middlewaree/authMiddleware")
const roleMiddleware= require("../middlewaree/roleMiddleware")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const  findUser=async (req,res)=>{
    try{
        const token=req.cookies.auth.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "User not authorized"})
        }

        const u =  jwt.verify(token, secret)
        // console.log(u.id)
        const user1 = await User.findById(u.id)
        setUser1(user1)
        console.log(user1);
        return user1
    }
    catch (e){

    }
    return null
}
const setUser1=async (user)=>{
    user1.email=user.email;
    user1.username=user1.username;
    user1.avatarUrl=user1.avatarUrl;
    user1.description=user1.description;
    user1.fullname=user1.fullname
    user1.phoneNumber=user1.phoneNumber
    user1.address=user1.address
    user1.twitterUrl=user1.twitterUrl
    user1.instagramUrl=user1.instagramUrl
    user1.facebookUrl=user1.facebookUrl
}
router.use(cookieParser())

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

let user;
let auth=user?true:false;
let user1={
    email:"",
    username:"",
    avatarUrl:"",
    description:"",
    fullname:"",
    phoneNumber:"",
    address:"",
    twitterUrl:"",
    instagramUrl:"",
    facebookUrl:"",
}
router
    .get('/login', (req, res) => {
        auth=user?true:false;
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
    user= findUser(req,res)
    auth=user?true:false;
    res.redirect("/home");
})

router.get('/home', (req, res) => {
    user= findUser(req,res)
    auth=user?true:false;
    res.render("index",{auth:auth,})
})
router.get('/about', (req, res) => {
    user= findUser(req,res)
    auth=user?true:false;
    res.render('aboutUs',{auth:auth,})
})
router.get('/catalog', (req, res) => {
    user= findUser(req,res)
    auth=user?true:false;
    res.render("catalog",{auth:auth,})
})
router.get('/user/profile/:id',(req, res) => {
    user= findUser(req,res)
    auth=user?true:false;
    setUser1(user)
    console.log(user1)


    res.render("personalArea",{
        auth:auth,
        edit:false,
        pavatarUrl:user,
        pusername:user,
        pfullname:user,
        pphoneNumber:user,
        paddress:user,
        pemail:user,
        pdescription:user,
        ptwitterUrl:user,
        pinstagramUrl:user,
        pfacebookUrl:user,
        pcomments:[],
    })
})
router
    .get('/user/edit',(req, res) => {
        user= findUser(req,res)
        auth=user?true:false;

        res.render("personalArea",{
            auth:auth,
            edit:true,
            pavatarUrl:user.avatarUrl,
            pusername:user.username,
            pfullname:user.fullname,
            pphoneNumber:user.phoneNumber,
            paddress:user.address,
            pemail:user.email,
            pdescription:user.description,
            ptwitterUrl:user.twitterUrl,
            pinstagramUrl:user.instagramUrl,
            pfacebookUrl:user.facebookUrl,
            pcomments:[],
        })
    })
    .post('/user/edit',(req, res) => {

    })

module.exports= router;