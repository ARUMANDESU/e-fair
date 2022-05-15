const Comment = require("../modules/Comment")

class commentController {
    async addNewComment(req,res){
        try{
            const from =req.params.fid
            const to =req.params.tid
            const text = req.body.payload
            const date =new Date()
            const year =date.getUTCFullYear()
            const month=date.getUTCMonth()
            const day=date.getUTCDay()
            const hour =date.getUTCHours()
            const min = date.getUTCMinutes()


            await new Comment({fromID:from,toID:to,commentText:text,date:{year:year,month:month,day:day,hour:hour,min:min}}).save()

            res.status(200)
        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:""})
        }
    }
}

module.exports= new commentController()