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
                if(files.images.size!=0){
                    for(let k=0;k<files.images.length;k++){
                        const result = await cloudinary.uploader.upload(files.images[k].filepath,{folder:`Product`,transformation: [{width: 1592, height: 745, crop: "thumb"}]});
                        images[k]={public_id:result.public_id,path: result.secure_url}
                    }
                }
                else{
                    images[0]={public_id:"Product/No_image_3x4.svg_dj7xfv",path:"https://res.cloudinary.com/nezz/image/upload/v1651846941/Product/No_image_3x4.svg_dj7xfv.png"}
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
            Product.findById(productIdName).exec().then(doc=>{
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
    async allProducts(req,res){
        try{
            const product =await Product.find()
            res.render('allProducts',{auth:res.user,products:product})
        }
        catch (e) {

        }
    }
    async removeProduct(req,res){
        try{
            cloudinary.config({
                cloud_name:process.env.cloudinary_cloud_name,
                api_key:process.env.cloudinary_api_key,
                api_secret:process.env.cloudinary_api_secret
            })


            const productIdName=req.params.id
            const product = await Product.findById(productIdName)
            product.images.forEach(async (data)=>{
                if(data.public_id!="Product/No_image_3x4.svg_dj7xfv"){
                    const deleteResult= await  cloudinary.uploader.destroy(`${data.public_id}`);
                }
            })
            const deleteProduct =await Product.deleteOne({_id:productIdName})
            res.render("message",{auth:res.user,message:"Removed",timeout:1000,where:`/allProducts`})

        }
        catch (e){
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/allProducts"})
        }
    }


}

module.exports= new catalogController();