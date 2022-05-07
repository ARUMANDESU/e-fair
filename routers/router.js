const express = require('express')
const router = express()
const authController =require("../controllers/authController")
const profileController= require("../controllers/profileController")
const catalogController = require("../controllers/catalogController")
const {check, checkSchema} = require("express-validator")
const authMiddleware = require("../middlewaree/authMiddleware")
const roleMiddleware= require("../middlewaree/roleMiddleware")
const auth =require("../middlewaree/auth")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const Uuid =require("uuid")
const upload = require("../utils/multer");

router.use(cookieParser())

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));


router
    .get('/login' , (req, res) => {
    res.render("login",{auth:res.user})

    })
    .post('/login', authController.login)

router
    .get('/register',auth(), (req, res) => {
    res.render("register",{auth:res.user})
    })
    .post('/register', [
        check('username',"Username cannot be empty").notEmpty(),
        check('password',"Password must be more than 7 and less than 15 symbols").isLength({min:7,max:15})
    ],authController.register)

router
    .get("/users/:page" ,auth(),roleMiddleware(['ADMIN']) ,authController.getUsers);

router.get('/',auth() , (req, res) => {
    res.redirect("/home");
})

router.get('/home',auth() ,catalogController.home)
router.get('/about',auth() , (req, res) => {
    res.render('aboutUs',{auth:res.user})
})
router
    .get('/catalog/:page',auth() ,catalogController.catalog)
router
    .get('/catalog/:type/page/:page',auth(),catalogController.catalogType)
router
    .get('/newAd',auth(), catalogController.newAdGet)
    .post("/newAd",auth(),catalogController.newAdPost)
router
    .get('/product/:id',auth(),catalogController.productPage)
router
    .get('/allProducts/:page',auth(),roleMiddleware(['ADMIN']),catalogController.allProducts)
router
    .get('/user/profile/:id',auth(), profileController.personalAreaGet)
router
    .get('/user/edit',auth(),profileController.personalAreaEditGet)
    .post('/user/edit',auth(),profileController.personalAreaEditPost)
router
    .post('/users/delete/:user',auth(),roleMiddleware(['ADMIN']),profileController.deleteUser)
    .post('/users/make/:user/:role',auth(),roleMiddleware(['ADMIN']),profileController.assignRole)
    .post('/users/make/:user/:role',auth(),roleMiddleware(['ADMIN']),profileController.assignRole)
router
    .post('/catalog/remove/:id',auth(),catalogController.removeProduct)
router
    .get('/user/edit/ava',auth(),profileController.personalAreaEditAvaGet)
    .post('/user/edit/ava',auth(),upload.single("iavatar"),profileController.personalAreaEditAvaPost)
router.get('/logout',authController.logOut)
module.exports= router;