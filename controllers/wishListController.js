const User = require("../modules/User")
const Product = require("../modules/Product")
const WishList = require("../modules/WishList")

class wishListController {
    async getWishList(req,res){
        try{
            const products=[]
            const wishList = await WishList.findOne({userID:res.user.id})


            if(wishList){
                for(let k=0;k<wishList.list.length;k++){
                    products[k]=await Product.findById(wishList.list[k].productID)
                }
            }
            res.render('wishList',{
                auth:res.user,
                products:products,
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/home"})
        }
    }
    async addToWishList(req,res){
        try{
            const product =req.params.product

            const wishList = await WishList.findOne({userID:res.user.id})

            if(wishList){

                await WishList.findOneAndUpdate({userID:res.user.id},{$push:{list:{productID:product}}})
            }
            else {

                await new WishList({userID:res.user.id,list:[{productID: product}]}).save()
            }
            res.status(200)
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:""})
        }
    }
    async deleteFromMyWishList(req,res){
        try{
            const product =req.params.product
            console.log(product)
            console.log(res.user.id)
            const wishList= await WishList.findOneAndUpdate({userID:res.user._id},{$pull:{list:{productID:product}}})
            console.log(wishList)
            res.status(200).render("message",{auth:res.user,message:"Deleted",timeout:1500,where:"/MyWishList"})
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:"/home"})
        }
    }

}
module.exports= new wishListController()