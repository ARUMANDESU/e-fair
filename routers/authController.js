
const User = require("../modules/User")
const Role = require("../modules/Role")
const bcrypt =require("bcryptjs")
const {validationResult} =require("express-validator");


class authController{
    async register(req, res){
        try{
            const username= req.body.username;
            const password= req.body.password;

            const errors =validationResult(req);
            if(!errors){
                return res.status(400).json({message:"Error",errors})
            }
            
            
            const candidate =await User.findOne({username})
            if(candidate){
                return res.status(400).json({message:"Username already exists"})
            }
            const hashPassword = bcrypt.hashSync(password,7);
            const userRole = await Role.findOne({value:"USER"});
            const user = new User({username,password:hashPassword,roles:[userRole.value]});
            await user.save();
            return res.json({message:"The user has been successfully registered"})
        }catch(e){
            console.log(e);
            res.status(400).json({message:"Registration error"})
        }
    }

    async login(req, res){
        try{
            const username= req.body.username;
            const password= req.body.password;
            
            const user =await User.findOne({username});
            if(!user){
                return res.status(400).json({message:`User ${username} not found`})
            }
            const validPassword = bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return res.status(400).json({message:`Wrong password`})
            }
        }catch(e){
            console.log(e);
            res.status(400).json({message:"Login error"})
        }
    }
    
    async getUsers(req, res){
        try{
            // const userRole =new Role()
            // const adminRole =new Role({value:"ADMIN"})
            // await userRole.save()
            // await adminRole.save()
            res.json("GET USERS");
        }catch(e){

        }
    }
}

module.exports =new authController();