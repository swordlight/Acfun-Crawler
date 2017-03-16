import express from 'express';
import crawler from './crawler';
let app=express();

app.get('/',function(require,response){
    crawler('http://www.acfun.cn/v/list110/index.htm',response);
});

var server=app.listen(3000,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('Example app listening at http://%s:%s',host,port);
})