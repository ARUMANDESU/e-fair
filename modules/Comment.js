const {Schema, model} =require("mongoose");

const Comment = new Schema({
    fromID:{type:String, unique:false,required:true},
    toID:{type:String, unique:false,required:true},
    commentText:{type:String, unique:false,required:true},
    date:{
        year:{type:Number, unique:false,required:true},
        month:{type:Number, unique:false,required:true},
        day:{type:Number, unique:false,required:true},
        hour:{type:Number, unique:false,required:true},
        min:{type:Number, unique:false,required:true},
    }

})

module.exports= model("Comment",Comment)