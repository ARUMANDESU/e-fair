const User = require("../modules/User")
const Role = require("../modules/Role")
const bcrypt =require("bcryptjs")
const jwt =require("jsonwebtoken")
const cloudinary = require("cloudinary").v2;





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
            cloudinary.config({
                cloud_name:process.env.cloudinary_cloud_name,
                api_key:process.env.cloudinary_api_key,
                api_secret:process.env.cloudinary_api_secret
            })
            const token=req.cookies.auth.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User not authorized"})
            }
            const u = jwt.verify(token, process.env.secret)

            const result = await cloudinary.uploader.upload(req.file.path,{folder:"avatars",transformation: [{width: 150, height: 150, crop: "thumb"}]});
            const user = await User.updateOne({_id:u.id},{
                avatarUrl:result.secure_url,
                phoneNumber:req.body.iphonenumber,
                address:req.body.iaddress,
                description:req.body.idescription,
                twitterUrl:req.body.itwitterUrl,
                instagramUrl:req.body.iinstagramUrl,
                facebookUrl:req.body.ifacebookUrl
            })
            res.render("message",{auth:res.user,message:"changed",timeout:100,where:`/user/profile/${res.user.username}`})
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:2000,where:`/user/edit`})
        }
    }
}
module.exports =new profileController();