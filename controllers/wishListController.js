
class wishListController {
    async addToWishList(req,res){
        try{

        }
        catch (e) {
            console.log(e);
            res.status(400).render("message",{auth:res.user,message:"Error",timeout:1500,where:""})
        }
    }
}
module.exports= new wishListController()