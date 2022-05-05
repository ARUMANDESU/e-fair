const User = require("../modules/User")
const Role = require("../modules/Role")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
const {secret} = require("../config");

class profileController{
    async personalAreaGet(req,res){

        try{
            const userIdName=req.params.id
            User.findOne({username:userIdName}).exec().then(doc=>{
                res.render("personalArea",{
                    auth:res.user,
                    user:doc,
                    edit:false,
                    pcomments:[],
                })
            })


        }
        catch (e) {
            console.log(e);
            res.status(400).json({message:"Error"})
        }
    }

    async personalAreaEditGet(req,res){
        try{
            const avatar= res.user ? res.user.avatarUrl:""
            res.render("personalArea",{
                auth:res.user,
                user:[],
                edit:true,
                pcomments:[],
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({message:"Error"})
        }
    }

    async personalAreaEditPost(req,res){
        try {

            const token=req.cookies.auth.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User not authorized"})
            }
            const u = jwt.verify(token, secret)
            const user = await User.updateOne({_id:u.id},{
                phoneNumber:req.body.iphonenumber,
                address:req.body.iaddress,
                description:req.body.idescription,
                twitterUrl:req.body.itwitterUrl,
                instagramUrl:req.body.iinstagramUrl,
                facebookUrl:req.body.ifacebookUrl
            })
            console.log(req.body)
            res.render("message",{auth:res.user,message:"changed",timeout:100,where:`/user/profile/${res.user.username}`})
        }
        catch (e) {
            console.log(e);
            res.status(400).json({message:"Error"})
        }
    }
}
module.exports =new profileController();