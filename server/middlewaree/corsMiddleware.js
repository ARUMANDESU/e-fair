function cors(req,res,next){
    try{
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "GET, PU, PATH, POST, DELETE")
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        next();
    }
    catch (e) {
        console.log(e)
    }

}

module.exports=cors