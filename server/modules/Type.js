const {Schema, model} =require("mongoose");

const Type =new Schema({
    value:{type:String, unique:true,default:"OTHER"}
})

module.exports = model('Type',Type)