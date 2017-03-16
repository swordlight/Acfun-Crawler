import http from 'http';
import cheerio from 'cheerio';


export default function(url,response){
    http.get(url,function(res){ //发送get请求
        let html='';
        let articles=[];

        res.setEncoding('utf-8'); //设置中文编码
        //监听数据接收
        res.on('data',function(chunk){
            html+=chunk;
        });
        res.on('end',function(){
            let $=cheerio.load(html); //解析html
            $('#block-content-article').children().filter('.mainer').children('.item').each(function(index,item){
                let comment=$(this).children('.hint-comm-article').children().first().text();
                let title=$(this).find('.title').text();
                let author=$(this).find('.article-info').children().first().text();
                let date=$(this).find('.article-info').text();
                //提取日期
                let first=date.indexOf('\n');
                let last=date.lastIndexOf('\n');
                date=date.substring(first+1,last)
                let subtitle=$(this).find('.desc').text();

                let article={
                    '评论数':comment,
                    '标题':title,
                    '作者':author,
                    '日期':date,
                    '副标题':subtitle
                }
                articles.push(article);
            });
            response.send(articles); //返回数据
        })
    })
}
