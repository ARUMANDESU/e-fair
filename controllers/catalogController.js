const User = require("../modules/User")
const Role = require("../modules/Role")
const Type = require("../modules/Type")
const Product = require("../modules/Product")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
const {query} = require("express-validator");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable")


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
    async newAdPost(req, res,next){
        try {
            cloudinary.config({
                cloud_name:process.env.cloudinary_cloud_name,
                api_key:process.env.cloudinary_api_key,
                api_secret:process.env.cloudinary_api_secret
            })
            const form = formidable({ multiples: true });

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    next(err)
                    return;
                }
                const images=[]
                for(let k=0;k<files.images.length;k++){
                    const result = await cloudinary.uploader.upload(files.images[k].filepath,{folder:`Product/${fields.productName}`,transformation: [{width: 1800, height: 1800, crop: "thumb"}]});
                    images[k]={public_id:result.public_id,path: result.secure_url}
                }
                const productType = await Type.findOne({value:`${fields.type}`})

                const  product= new Product({name:fields.productName,ownerID:res.user.id,description:fields.productDescription,type:[productType.value],images:images})
                product.save();
                res.render("message",{auth:res.user,message:"Created",timeout:100,where:`/user/profile/${res.user.username}`})
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/home"})
        }
    }
    async productPage(req,res){
        try{
            const productIdName=req.params.id
            Product.findOne({id:productIdName}).exec().then(doc=>{
                res.render("productPage",{
                    auth:res.user,
                    product:doc,
                })
            })
        }
        catch (e){
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/home"})
        }
    }


}

module.exports= new catalogController();