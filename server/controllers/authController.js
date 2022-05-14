const User = require("../modules/User")
const Role = require("../modules/Role")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
const {validationResult} =require("express-validator");



const {OAuth2Client, auth} = require('google-auth-library');
const CLIENT_ID = "604574523814-40f76epsh7ji778mnp5c57ct9jm41dqv.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);


const generateAccessToken = (id,role)=>{
    const payload={
        id,
        role
    }
    return jwt.sign(payload,process.env.secret,{expiresIn:"24h"})
}

class authController{
    async register(req, res){
        try{
            
            let token = req.body.token;
            
            console.log(token);

            async function verify() {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID,
                })
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                console.log(payload);
                return payload;
            }




            const email =   req.body.email;
            const username = req.body.token != null ? verify().username :  req.body.username;
            const password = req.body.token != null ? verify().username :  req.body.password;
            
            const errors =validationResult(req);
            if(!errors){
                return res.status(400).render("message",{auth:res.user,message:"errors",timeout:1000,where:"/register"})
            }
            

            const candidate =await User.findOne({username})
            if(candidate){
                return await res.render("message",{auth:res.user,avatar:"",message:"Username already exists",timeout:1000,where:"/register"})
            }
            const hashPassword = bcrypt.hashSync(password,7);
            const userRole = await Role.findOne({value:"USER"});
            const user = new User({email,username,password:hashPassword,roles:[userRole.value],avatarUrl:"https://res.cloudinary.com/nezz/image/upload/v1651755541/avatars/ecce-homo_j36lz7.jpg",phoneNumber:"",address:"",twitterUrl:"",instagramUrl:"",facebookUrl:""});
            await user.save();
            return await  res.render("message",{auth:res.user,message:"The user has been successfully registered",timeout:1000,where:"/login"})
            
        }catch(e){
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Registration error",timeout:1000,where:"/register"})
        }
    }

    async login(req, res){
        try{
            const username= req.body.username;
            const password= req.body.password;
            
            const user =await User.findOne({username});
            if(!user){
                return res.status(400).render("message",{auth:res.user,message:`User ${username} not found`,timeout:1500,where:"/login"})
            }
            const validPassword = bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return res.status(400).render("message",{auth:res.user,message:"Wrong password",timeout:1000,where:"/login"})
            }
            const token =generateAccessToken(user._id,user.roles);
            res.cookie("auth",'Bearer '+ token)
            res.render("message",{auth:res.user,message:"You successfully logged in",timeout:500,where:"/home"})

        }catch(e){
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Login error",timeout:700,where:"/login"})
        }
    }
    
    async getUsers(req, res){
        try{

            const user= await User.find().sort({roles:1})
            const pageNum=req.params.page
            const start=(pageNum-1)*20
            const end= user.length
            res.render("users",{
                auth:res.user,
                users:user,
                start:start,
                end:end,
                page:pageNum,
            })
            // const userRole =new Role()
            // const adminRole =new Role({value:"ADMIN"})
            // await userRole.save()
            // await adminRole.save()
        }catch(e){

        }
    }

    async logOut(req,res){
        try {
            res.clearCookie("auth")
            res.render("message",{user:res.user,auth:res.user,message:"Logout",timeout:300,where:"/home"})
        } catch (e) {
            console.log(e)
            return res.status(403).render("message",{user:res.user,auth:res.user,message:"Logout errors",timeout:1500,where:"/home"})
        }
    }
}

module.exports =new authController();