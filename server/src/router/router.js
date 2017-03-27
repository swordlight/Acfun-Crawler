import bodyParser from 'body-parser';

export default (app,express,action)=>{
    app.use(bodyParser.json());
    let router=express.Router();
    router.all('/reg',function(req,res){
        action.reg(req,res);
    });
    app.use(router);
}