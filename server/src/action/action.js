import db from '../db/db'

export default{
    reg(req,res){
        let username=req.body.name;
        let userpassword=req.body.password;
        db.users.find({'username':username},function(e,s){
            if(e){
                console.log('error'+e);
                res.status(500);
            }else{
                if(s.length>=1){
                    res.status(200).json({state:301,msg:'账号已存在',data:{}});
                }else{
                    let user=new db.users({
                        username:username,
                        userpassword:userpassword
                    })
                    user.save(function(e,s){
                        if(e){
                            console.log('error'+e)
                            res.status(500);
                        }else{
                            res.status(200).json({state:200,msg:'注册成功',data:{}});
                        }
                    })
                }
            }
        })
    },
    login(req,res){
        let username=req.body.name;
        let userpassword=req.body.password;
        db.users.find({'username':username},function(e,s){
            if(e){
                console.log('error'+e);
                res.status(500);
            }else{
                if(s.length>=1){
                    db.users.find({'username':username,'userpassword':userpassword},function(e,s){
                        if(e){
                            console.log('error'+e);
                            res.status(500);
                        }else{
                            if(s.length===1){
                                res.status(200).json({state:200,msg:'登录成功',data:{}});
                            }else{
                                res.status(200).json({state:302,msg:'密码错误',data:{}});
                            }
                        }
                    })
                }else{
                    res.status(200).json({state:301,msg:'用户不存在',data:{}});
                }
            }
        })
    }
}