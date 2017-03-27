'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crawler = require('./action/crawler');

var _crawler2 = _interopRequireDefault(_crawler);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, '../../web'))); //将web的页面设为静态资源可直接访问

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});