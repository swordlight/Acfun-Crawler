import db from '../db/db'
import util from '../libs/util'
import jwt from 'jsonwebtoken'

export default{
    reg(req,res,next){
        let username=req.body.name;
        let userpassword=req.body.password;
        db.users.find({'username':username},function(e,s){
            if(e){
                next(e);
            }else{
                if(s.length>=1){
                    res.status(200).json({state:10001,msg:'账号已存在',data:{}});
                }else{
                    let user=new db.users({
                        username:username,
                        userpassword:userpassword,
                        uid:util.createuid(),
                        nickname:'',
                        signature:'这个人很懒，什么都没有写',
                        poster:'http://localhost:4000/image/noposter.png'
                    })
                    user.save(function(e,s){
                        if(e){
                            next(e);
                        }else{
                            var token=jwt.sign({uid:user.uid,exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'woshidashabi');
                            res.status(200).json({state:200,msg:'注册成功',data:{token:token}});
                        }
                    })
                }
            }
        })
    },
    login(req,res,next){
        let username=req.body.name;
        let userpassword=req.body.password;
        db.users.find({'username':username},function(e,s){
            if(e){
                next(e);
            }else{
                if(s.length>=1){
                    db.users.find({'username':username,'userpassword':userpassword},function(e,s){
                        if(e){
                            next(e);
                        }else{
                            if(s.length===1){
                                var token=jwt.sign({uid:s[0].uid,exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'woshidashabi');
                                res.status(200).json({state:200,msg:'登录成功',data:{token:token}});
                            }else{
                                res.status(200).json({state:10002,msg:'密码错误',data:{}});
                            }
                        }
                    })
                }else{
                    res.status(200).json({state:10003,msg:'用户不存在',data:{}});
                }
            }
        })
    },
    alllist(req,res,next){
        db.blogs.find({},function(e,s){
            if(e){
                next(e);
            }else{
                res.status(200).json({state:200,msg:'查询成功',data:s});
            }
        })
    },
    content(req,res,next){
        let bid=req.body.bid;
        db.blogs.find({'bid':bid},function(e,s){
            if(e){
                next(e);
            }else{
                res.status(200).json({state:200,msg:'查询成功',data:s[0]});
            }
        })
    },
    comments(req,res,next){
        let bid=req.body.bid;
        db.comments.find({'bid':bid},function(e,s){
            if(e){
                next(e);
            }else{
                res.status(200).json({state:200,msg:'查询成功',data:s});
            }
        })
    },
    personlist(req,res,next){
        util.checkToken(db,jwt,req,res,next,function(decoded){  //验证token
            var uid=decoded.uid;
            db.blogs.find({'uid':uid},function(e,s){
                if(e){
                    next(e);
                }else{
                    res.status(200).json({state:200,msg:'查询成功',data:s});
                }
            })
        });
    },
    getuserinfo(req,res,next){
        util.checkToken(db,jwt,req,res,next,function(decoded){  //验证token
            var uid=decoded.uid;
            db.users.find({'uid':uid},function(e,s){
                if(e){
                    next(e);
                }else{
                    res.status(200).json({state:200,msg:'查询成功',data:s[0]});
                }
            })
        });
    },
    edituserinfo(req,res,next){
        util.checkToken(db,jwt,req,res,next,function(decoded){  //验证token
            var uid=decoded.uid;
            switch(Object.keys(req.body)[0]){
                case 'username':
                    db.users.find({'uid':{$ne:uid},'username':req.body.username},(e,s)=>{
                        if(e){
                            next(e);
                        }else{
                            if(s.length<=0){
                                db.users.update({'uid':uid},{$set:{'username':req.body.username}},(e,s)=>{
                                    if(e){
                                        next(e);
                                    }else{
                                        res.status(200).json({state:200,msg:'修改成功',data:{}});
                                    }
                                })
                            }else{
                                res.status(200).json({state:10001,msg:'用户名已存在',data:{}});
                            }
                        }
                    });
                    break;
                case 'nickname':
                    db.users.update({'uid':uid},{$set:{'nickname':req.body.nickname}},(e,s)=>{
                        if(e){
                            next(e);
                        }else{
                            res.status(200).json({state:200,msg:'修改成功',data:{}});
                        }
                    });
                    break;
                case 'signature':
                    db.users.update({'uid':uid},{$set:{'signature':req.body.signature}},(e,s)=>{
                        if(e){
                            next(e);
                        }else{
                            res.status(200).json({state:200,msg:'修改成功',data:{}});
                        }
                    })
                    break;
                case 'poster':
                    db.users.update({'uid':uid},{$set:{'poster':req.body.poster}},(e,s)=>{
                        if(e){
                            next(e);
                        }else{
                            res.status(200).json({state:200,msg:'上传成功',data:{}});
                        }
                    })
                default:
                    break;
            }
        });
    },
    createBlog(req,res,next){
        util.checkToken(db,jwt,req,res,next,function(decoded){
            var uid=decoded.uid;
            db.users.find({'uid':uid},function(e,s){
                if(e){
                    next(e);
                }else{
                    let blog=new db.blogs({
                        bid:util.createbid(),
                        uid:uid,
                        title:req.body.title,
                        author:s[0].username,
                        timestamp:Date.now(),
                        comment:0,
                        viewnumber:1,
                        subtitle:req.body.subtitle,
                        content:req.body.context
                    })
                    blog.save(function(e,s){
                        if(e){
                            next(e);
                        }else{
                            res.status(200).json({state:200,msg:'发布成功',data:{}})
                        }
                    })
                }
            })
        });
        
    }
}