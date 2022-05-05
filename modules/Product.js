const {Schema, model} =require("mongoose");

const Product= new Schema({
    name:{type:String, unique:false,required:false},
    ownerUsername:{type:String, unique:false,required:false},
    ownerID:{type:String, unique:false,required:false},
    images:[{type:String, unique:false,required:false}],
    description:{type:String, unique:false,required:false},
    type:[{type:String, ref:'Type'}],
})

module.exports= model("Product",Product)