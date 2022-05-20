const express = require('express')
const router = express()

const authController =require("../controllers/authController")
const profileController= require("../controllers/profileController")
const catalogController = require("../controllers/catalogController")
const commentController=require("../controllers/commentController")
const wishListController = require("../controllers/wishListController")
const chatController = require('../controllers/chatController')

const {check, checkSchema} = require("express-validator")

const authMiddleware = require("../middlewaree/authMiddleware")
const roleMiddleware= require("../middlewaree/roleMiddleware")
const auth =require("../middlewaree/auth")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const upload = require("../utils/multer");
const dotenv =require("dotenv")

dotenv.config()
const Razorpay =require('razorpay')

const instance = new Razorpay({
    key_id: process.env.razorpay_key_id,
    key_secret: process.env.razorpay_key_secret,
});




router.use(cookieParser())

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));


router
    .get('/login' ,auth(), (req, res) => {
    res.render("login",{auth:res.user})
    })
    .post('/login',auth(), authController.login)

router
    .get('/register',auth(), (req, res) => {
    res.render("register",{auth:res.user})
    })
    .post('/register',auth(), [
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
    .get('/newAd',auth(),roleMiddleware(['USER','ADMIN']), catalogController.newAdGet)
    .post("/newAd",auth(),roleMiddleware(['USER','ADMIN']),catalogController.newAdPost)
router
    .get('/product/:id',auth(),catalogController.productPage)
router
    .post('/getAds',catalogController.search)
router
    .get('/allProducts/:page',auth(),roleMiddleware(['ADMIN']),catalogController.allProducts)
router
    .get('/user/profile/:id',auth(), profileController.personalAreaGet)
router
    .get('/user/edit',auth(),roleMiddleware(['USER','ADMIN']),profileController.personalAreaEditGet)
    .post('/user/edit',auth(),roleMiddleware(['USER','ADMIN']),profileController.personalAreaEditPost)
router
    .post('/users/delete/:user',auth(),roleMiddleware(['ADMIN']),profileController.deleteUser)
    .post('/users/make/:user/:role',auth(),roleMiddleware(['ADMIN']),profileController.assignRole)
    .post('/users/make/:user/:role',auth(),roleMiddleware(['ADMIN']),profileController.assignRole)
router
    .post('/catalog/remove/:id',auth(),roleMiddleware(['ADMIN']),catalogController.removeProduct)
router
    .post('/catalog/set/:statusName/:id',auth(),roleMiddleware(['ADMIN']),catalogController.setStatus)
router
    .get('/user/edit/ava',auth(),roleMiddleware(['USER','ADMIN']),profileController.personalAreaEditAvaGet)
    .post('/user/edit/ava',auth(),roleMiddleware(['USER','ADMIN']),upload.single("iavatar"),profileController.personalAreaEditAvaPost)
router
    .get('/logout',authController.logOut)
router
    .post('/api/create/orderId',auth(),async (req,res)=>{
        const options = {
            amount: 50000,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
          instance.orders.create(options, function(err, order) {
            res.json({orderID:order.id})
          });
          
    })

router
    .post('/addComment/:fid/to/:tid',auth(),roleMiddleware(['USER','ADMIN']),commentController.addNewComment)
router
    .get('/MyWishList',auth(),roleMiddleware(['USER','ADMIN']),wishListController.getWishList)
    .post('/addToMyWishList/:product',auth(),roleMiddleware(['USER','ADMIN']),wishListController.addToWishList)
    .post('/deleteFromMyWishList/:product',auth(),roleMiddleware(['USER','ADMIN']),wishListController.deleteFromMyWishList)



//chat
router
    .get('/chat',auth(),roleMiddleware(['USER','ADMIN']),chatController.chat)
    .get('/chat/:username',auth(),roleMiddleware(['USER','ADMIN']),chatController.chatusername)
module.exports= router;