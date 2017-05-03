let uid=10000;
let bid=10000;
export default{
    createuid(){
        return uid++;
    },
    createbid(){
        return bid++;
    },
    checkToken(db,jwt,req,res,next,callback){
        jwt.verify(req.body.token,'woshidashabi',function(err,decoded){
            if(err){
                if(err.name==='TokenExpiredError'){
                    res.status(200).json({state:10051,msg:'token失效',data:{}});
                }else if(err.name==='JsonWebTokenError'){
                    res.status(200).json({state:10052,msg:'token错误',data:{}});
                }
            }else{
                callback(decoded);
            }
        })
    }
}