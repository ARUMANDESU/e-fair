

class chatController{
    async chat(req,res){
        const username = req.params.username
        res.render('chat',{auth:res.user,})
    }
}

module.exports = new chatController