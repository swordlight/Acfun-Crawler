const Crawler = require('crawler')

let c = new Crawler()

let getUserList = () => {
  
}

/**
 * 
 * @param time 最近时间范围 单位天
 */
let getArticleList = (time) => {
  c.queue({
    uri: 'http://webapi.aixifan.com/query/article/list?pageNo=1&size=10000&filterTitleImage=false',
    callback: (err, res, done) => {
      if(err) {
        console.log(err)
      } else {
        let articleList
      }
    }
  })
}