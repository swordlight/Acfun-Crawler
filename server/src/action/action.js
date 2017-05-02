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
                        uid:util.createuid()
                    })
                    user.save(function(e,s){
                        if(e){
                            next(e);
                        }else{
                            res.status(200).json({state:200,msg:'注册成功',data:{}});
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
        util.checkToken(db,jwt,req,res,function(decoded){
            var uid=decoded.uid;
            db.blogs.find({'uid':uid},function(e,s){
                if(e){
                    next(e);
                }else{
                    res.status(200).json({state:200,msg:'查询成功',data:s});
                }
            })
        });  //验证token
    },
    createBlog(req,res,next){
        let blog=new db.blogs({
            bid:util.createbid(),
            title:'第一个博客',
            author:'赵大树',
            timestamp:'2017.4.1',
            comment:20,
            viewnumber:300,
            subtitle:'第一个博客的副标题',
            content:`新华社昆明3月31日电（记者许万虎、岳冉冉）中科院科学家近日在塑料生物降解领域取得重大突破：研究人员首次发现能够高效降解聚氨酯塑料的新菌种——塔宾曲霉菌，该真菌有望成为未来治理白色污染的“利器”。这项成果已发表在国际权威期刊《环境污染》上。
聚氨酯材料是现代塑料工业中发展最快的品种之一，广泛用于工业、医疗、建筑和汽车等领域。
“聚氨酯的快速发展带来了其废弃物污染环境等问题。”据论文通讯作者、项目负责人中科院昆明植物研究所研究员许建初介绍，目前聚氨酯材料的化学降解主要包括水解、热降解、光降解等，但这类降解成本高且易产生二次污染，而更为环保的生物降解一直是全球塑料污染研究的难点。
“真菌的生物降解是治理合成塑料污染的重要途径，”许建初指出，全球科学家在上世纪90年代就开始研究塑料生物降解，先后发现了几十种降解塑料的真菌，但由于其降解效率低、降解不彻底而作罢。
此次中科院研究组从城市垃圾中分离出的用于降解塑料的新型真菌，被鉴定命名为“塔宾曲霉菌”。实验室研究发现，它可以在聚氨酯表面生长，并通过生长过程中产生的酶和塑料发生生物反应，破坏塑料分子间或聚合物间的化学键；同时，这一真菌还利用了其菌丝的物理强度，帮助“掰开”塑料聚合物。
研究指出，在“塔宾曲霉菌”作用下，原本在自然环境中难以降解的塑料，两周就可以明显看到生物降解过程，两个月后其培养基上的塑料聚合物基本消失。“当然其降解效率还受到多种环境因素影响，包括酸碱度、温度以及所使用的培养基类型，”许建初说。
许建初指出：“未来，科研人员将逐步确定这一真菌大规模快速繁殖和塑料生物降解的理想条件，为产业化利用真菌降解塑料垃圾、治理塑料垃圾污染奠定基础。”`
        });
        blog.save(function(e,s){
            if(e){
                console.log('error'+e);
            }else{
                console.log('success');
            }
        })
    }
}