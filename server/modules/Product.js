const {Schema, model} =require("mongoose");

const Product= new Schema({
    name:{type:String, unique:false,required:false},
    ownerID:{type:String, unique:false,required:false},
    images:[{
        public_id:{type:String, unique:false,required:false},
        path:{type:String, unique:false,required:false}
    }],
    cost:{type:Number,unique:false,required:false},
    description:{type:String, unique:false,required:false},
    type:[{type:String, ref:'Type'}],
    status:{type:String, ref:'Status'},
    rating:{type:Number,unique:false,required:false},
})

module.exports= model("Product",Product)