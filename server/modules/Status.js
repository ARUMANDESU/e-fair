const {Schema, model} =require("mongoose");

const Status = new Schema({
    value:{type:String, unique:true,default:"WAITING"},
})

module.exports = model('Status', Status)