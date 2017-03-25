import express from 'express';
import crawler from './crawler';
import path from 'path';
let app=express();


app.use(express.static(path.join(__dirname, '../../web'))); //将web的页面设为静态资源可直接访问

var server=app.listen(3000,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('Example app listening at http://%s:%s',host,port);
})