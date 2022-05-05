const User = require("../modules/User")
const Role = require("../modules/Role")
const Type = require("../modules/Type")
const Product = require("../modules/Product")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
const {query} = require("express-validator");
const cloudinary = require("cloudinary").v2;

class catalogController{
    async catalog(req,res){
        try{
            const otherType =new Type()
            const meatType =new Type({value:"MEAT"})
            const milkType =new Type({value:"MILK"})
            const fruitType =new Type({value:"FRUIT"})
            const vegetablesType =new Type({value:"VEGETABLES"})

            await otherType.save()
            await meatType.save()
            await milkType.save()
            await fruitType.save()
            await vegetablesType.save()
            res.render("catalog",{auth:res.user})
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/home"})
        }
    }
    async newAdGet(req, res){
        try {
            res.render("newAd",{auth:res.user})
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/home"})
        }
    }
    async newAdPost(req, res){
        try {
            // const token=req.cookies.auth.split(' ')[1]
            // if (!token) {
            //     return res.status(403).json({message: "User not authorized"})
            // }
            // const user = jwt.verify(token, process.env.secret)
            const productType = await Type.findOne({value:`${req.body.type}`})
            console.log(req.body.type)
            const  product= new Product({name:req.body.productName,ownerUsername:res.user.username,ownerID:res.user.id,description:req.body.productDescription,type:[productType.value]})
            product.save();
            res.render("message",{auth:res.user,message:"Created",timeout:100,where:`/user/profile/${res.user.username}`})
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/home"})
        }
    }


}

module.exports= new catalogController();