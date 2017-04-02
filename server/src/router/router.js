import bodyParser from 'body-parser'; //加载解析post请求中data中间件

export default (app,express,action)=>{
    app.use(bodyParser.json());
    let router=express.Router();  //路由管理中间件
    router.all('/reg',function(req,res){  //注册路由
        action.reg(req,res);
    });
    router.all('/login',function(req,res){  //登录路由
        action.login(req,res);
    });
    router.all('/alllist',function(req,res){  //所有博客列表
        action.alllist(req,res);
    });
    router.all('/content',function(req,res){  //查看博客详情
        action.content(req,res);
    })
    app.use(router);
}