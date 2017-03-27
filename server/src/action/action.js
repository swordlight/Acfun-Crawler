import db from '../db/db'

export default{
    reg(req,res){
        let username=req.body.username;
        let userpassword=req.body.userpassword;
        let user=new db.users({
            username:username,
            userpassword:userpassword
        })
        user.save(function(e,s){
            if(e){
                console.log('error'+e)
            }else{
                console.log('success');
            }
        })
        res.status(200).json({msg:'注册成功'});
    }
}