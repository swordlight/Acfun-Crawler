'use strict';

var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/acfun-crawler';

mongoose.connect(DB_URL); //连接mongodb数据库

mongoose.connection.on('connected', function () {
    console.log('mongoose连接成功' + DB_URL);
});

mongoose.connection.on('error', function (err) {
    console.log('mongoose连接失败' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('mongoose连接断开' + DB_URL);
});

var Schema = mongoose.Schema;

var UserSchema = new Schema({ //创建schema实例(数据模式，表结构，对应一个collection)
    username: { type: String },
    userpassword: { type: String }
});

var UserModel = mongoose.model('User', UserSchema); //创建schema模型，可操作数据库

var user = new UserModel({ //新建一个用户数据
    username: 'zzp',
    userpassword: '123'
});

user.save(function (e, s) {
    //将数据保存
    if (e) {
        console.log('error' + e);
    } else {
        console.log('success' + s);
    }
});