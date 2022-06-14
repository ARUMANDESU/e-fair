const {Schema, model} =require("mongoose");

const WishList = new Schema({
    userID:{type:String,unique:true,required:true},
    list:[{
        productID:{type:String,unique:true,required:false}
    }]
})

module.exports = model('WishList',WishList)