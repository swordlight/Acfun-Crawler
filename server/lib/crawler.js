'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (url, response) {
    _http2.default.get(url, function (res) {
        //发送get请求
        var html = '';
        var articles = [];

        res.setEncoding('utf-8'); //设置中文编码
        //监听数据接收
        res.on('data', function (chunk) {
            html += chunk;
        });
        res.on('end', function () {
            var $ = _cheerio2.default.load(html); //解析html
            $('#block-content-article').children().filter('.mainer').children('.item').each(function (index, item) {
                var comment = $(this).children('.hint-comm-article').children().first().text();
                var title = $(this).find('.title').text();
                var author = $(this).find('.article-info').children().first().text();
                var date = $(this).find('.article-info').text();
                //提取日期
                var first = date.indexOf('\n');
                var last = date.lastIndexOf('\n');
                date = date.substring(first + 1, last);
                var subtitle = $(this).find('.desc').text();

                var article = {
                    '评论数': comment,
                    '标题': title,
                    '作者': author,
                    '日期': date,
                    '副标题': subtitle
                };
                articles.push(article);
            });
            response.send(articles);
        });
    });
};

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }