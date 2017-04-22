import bodyParser from 'body-parser'; //加载解析post请求中data中间件

export default (app,express,action)=>{
    app.use(bodyParser.json());
    let router=express.Router();  //路由管理中间件
    router.use(function(req,res,next){  //每个路由都会执行
        next();  //将控制权交给下一个中间件
    });
    router.all('/',function(req,res,next){
        res.redirect(302,'http://localhost:4000/login.html')
    });
    router.all('/reg',function(req,res,next){  //注册路由
        action.reg(req,res,next);
    });
    router.all('/login',function(req,res,next){  //登录路由
        action.login(req,res,next);
    });
    router.all('/alllist',function(req,res,next){  //所有博客列表
        action.alllist(req,res,next);
    });
    router.all('/content',function(req,res,next){  //查看博客详情
        action.content(req,res,next);
    });
    router.all('/comments',function(req,res,next){  //查看博客评论
        action.comments(req,res,next);
    });
    router.all('/personlist',function(req,res,next){  //查看个人博客
        action.personlist(req,res,next);
    });
    router.use(function(err,req,res,next){  //错误处理
        console.log('error'+err);
        res.status(500).json(err);
    })
    app.use(router);
}