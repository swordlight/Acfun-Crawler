import mongoose from 'mongoose';
const DB_URL='mongodb://localhost:27017/acfun-crawler';

mongoose.connect(DB_URL);  //连接mongodb数据库

mongoose.connection.on('connected',function(){
    console.log('mongoose连接成功');
});

mongoose.connection.on('error',function(err){
    console.log('mongoose连接失败'+err);
})

mongoose.connection.on('disconnected',function(){
    console.log('mongoose连接断开'+DB_URL);
})

const Schema=mongoose.Schema;
//users collection
let UserSchema=new Schema({  //创建schema实例(数据模式，表结构)
    username:{type:String},
    userpassword:{type:String}
})
let UserModel=mongoose.model('users',UserSchema,'users');  //创建schema模型model，对应collection,可操作数据库 

export default {
    users:UserModel
}
