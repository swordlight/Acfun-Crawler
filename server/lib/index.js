'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crawler = require('./crawler');

var _crawler2 = _interopRequireDefault(_crawler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/', function (require, response) {
    (0, _crawler2.default)('http://www.acfun.cn/v/list110/index.htm', response);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});