const User = require("../modules/User")
const Role = require("../modules/Role")
const Type = require("../modules/Type")
const WishList = require("../modules/WishList")
const Product = require("../modules/Product")
const Status = require("../modules/Status")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
const {query} = require("express-validator");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable")
const Comment = require("../modules/Comment");


class catalogController{
    async catalog(req,res){
        try{
            // const Active =new Status({value:'ACTIVE'})
            // const Waiting =new Status()
            // const Inactive =new Status({value:'INACTIVE'})
            // const Rejected =new Status({value:'REJECTED'})
            // await Active.save()
            // await Waiting.save()
            // await Inactive.save()
            // await Rejected.save()
            // const otherType =new Type()
            // const meatType =new Type({value:"MEAT"})
            // const milkType =new Type({value:"MILK"})
            // const fruitType =new Type({value:"FRUIT"})
            // const vegetablesType =new Type({value:"VEGETABLES"})
            //
            // await otherType.save()
            // await meatType.save()
            // await milkType.save()
            // await fruitType.save()
            // await vegetablesType.save()
            try{
                const products=[]
                const product= await Product.find({status:"ACTIVE"}).sort({rating:-1})
                let isInWishList=false;

                for(let k=0;k<product.length;k++){
                    if(res.user){
                        const wishList= await WishList.findOne({userID:res.user.id}).exec()
                        if(wishList){
                            wishList.list.forEach(listProduct=>{if(listProduct.productID==product[k].id){isInWishList=true}})
                        }
                    }
                    products[k]={
                        product: product[k],
                        inWishList: isInWishList
                    }
                    isInWishList=false
                }
                const pageNum= req.params.page
                const start=(pageNum-1)*20
                const end = products.length
                res.render("catalog",{
                    auth:res.user,
                    product:products,
                    start:start,
                    end:end,
                    page:pageNum,
                })



            }
            catch (e) {
                console.log(e);
                res.status(400).render("message",{auth:res.user,message:"Error",timeout:1000,where:`/home`})
            }
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
                    console.log(files.images)
                    if(typeof files.images=="object"&&files.images.length==1){
                        const result = await cloudinary.uploader.upload(files.images.filepath,{folder:`Product`,transformation: [{width: 1592, height: 745, crop: "thumb"}]});
                        images[0]={public_id:result.public_id,path: result.secure_url}
                    }
                    else{
                        for(let k=0;k<files.images.length;k++){
                            const result = await cloudinary.uploader.upload(files.images[k].filepath,{folder:`Product`,transformation: [{width: 1592, height: 745, crop: "thumb"}]});
                            images[k]={public_id:result.public_id,path: result.secure_url}

                        }
                    }

                }
                else{
                    images[0]={public_id:"Product/No_image_3x4.svg_dj7xfv",path:"https://res.cloudinary.com/nezz/image/upload/v1651846941/Product/No_image_3x4.svg_dj7xfv.png"}
                }

                const productType = await Type.findOne({value:`${fields.type}`})
                const productStatus = await Status.findOne({value:"WAITING"})
                const product= new Product({name:fields.productName,ownerID:res.user.id,cost:fields.cost,description:fields.productDescription,type:[productType.value],images:images,status:productStatus.value,rating:2.5})
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
            await Product.findById(productIdName).exec().then(async doc=>{
                const comment=[]
                const comments = await Comment.find({toID:doc.id})
                let isInWishList=false
                if(res.user){
                    const wishList= await WishList.findOne({userID:res.user.id}).exec()
                    if(wishList){
                        wishList.list.forEach(listProduct=>{if(listProduct.productID==doc.id){isInWishList=true}})
                    }
                }
                for(let k=0;k<comments.length;k++){
                    comment[k]={
                        user:await User.findById(comments[k].fromID),
                        comments: comments[k],
                    }
                }
                res.render("productPage",{
                    auth:res.user,
                    product:doc,
                    pcomments:comment,
                    isWishList:isInWishList,

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
            const productAndUser=[]
            const product =await Product.find()
            for(let k=0;k<product.length;k++){
                productAndUser[k]={product:product[k],user:await User.findById(product[k].ownerID)}
            }
            const pageNum= req.params.page
            const start=(pageNum-1)*20
            const end= productAndUser.length
            res.render('allProducts',{
                auth:res.user,
                products:productAndUser,
                start:start,
                end:end,
                page:pageNum,
            })
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
            res.render("message",{auth:res.user,message:"Removed",timeout:1000,where:`/allProducts/1`})

        }
        catch (e){
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/allProducts/1"})
        }
    }
    async home(req,res){
        try {
            const products=[]
            const product= await Product.find({status:"ACTIVE"}).sort({rating:-1}).limit(10)
            let isInWishList=false;

            for(let k=0;k<product.length;k++){
                if(res.user){
                    const wishList= await WishList.findOne({userID:res.user.id}).exec()
                    if(wishList){
                        wishList.list.forEach(listProduct=>{if(listProduct.productID==product[k].id){isInWishList=true}})
                    }
                }
                products[k]={
                    product: product[k],
                    inWishList: isInWishList
                }
                isInWishList=false
            }
            res.render("index",{auth:res.user,product:products})
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:100000,where:""})
        }
    }
    async catalogType(req,res){
        try{
            const typeName=req.params.type
            const products=[]
            const product= await Product.find({type:typeName.toUpperCase(),status:"ACTIVE"}).sort({rating:-1})
            let isInWishList=false;

            for(let k=0;k<product.length;k++){
                if(res.user){
                    const wishList= await WishList.findOne({userID:res.user.id}).exec()
                    if(wishList){
                        wishList.list.forEach(listProduct=>{if(listProduct.productID==product[k].id){isInWishList=true}})
                    }
                }
                products[k]={
                    product: product[k],
                    inWishList: isInWishList
                }
                isInWishList=false
            }
            const pageNum= req.params.page
            const start=(pageNum-1)*20
            const end = products.length
            res.render("catalogType",{
                auth:res.user,
                product:products,
                start:start,
                end:end,
                page:pageNum,
                type:typeName,
            })


        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1000,where:`/home`})
        }
    }
    async search(req,res){
        try{
            let payload =req.body.payload.trim()
            const productAndUser=[]
            const product=await Product.find({name:{$regex: new RegExp('^'+payload+'.*','i')}}).sort({rating:-1}).exec();
            for(let k=0;k<product.length;k++){
                productAndUser[k]={product:product[k],user:await User.findById(product[k].ownerID)}
            }
            res.send({payload:productAndUser});

        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1000,where:`/home`})
        }
    }


}

module.exports= new catalogController();