const User = require("../modules/User")
const Role = require("../modules/Role")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
const {secret} = require("../config");

class profileController{
    async personalAreaGet(req,res){
        try{
            console.log(res.user);
            res.render("personalArea",{
                auth:res.user,
                edit:false,
                pcomments:[],
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
            res.render("personalArea",{
                auth:res.user,
                edit:false,
                pcomments:[],
            })
        }
        catch (e) {
            console.log(e);
            res.status(400).json({message:"Error"})
        }
    }
}
module.exports =new profileController();