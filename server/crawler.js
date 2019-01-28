const Crawler = require('crawler')

let getUserList = () => {
  
}

/**
 * 
 * @param amount 文章数量 最大10000
 */
let getArticleList = (amount) => {
  return new Promise((resolve, reject) => {
    amount = amount ? amount : 20000
    let baseAmount = 200 //每次查询数量

    if (amount <= baseAmount) baseAmount = amount
    let articleList = []
    let c = new Crawler({
      jQuery: false,
      callback: (err, res, done) => {
        if(err) {
          reject(err)
        } else {
          if (res.statusCode === 200) {
            let body = JSON.parse(res.body)
            if (body.code === 200) {
              articleList = articleList.concat(body.data.articleList)
              console.log(`已爬取：${articleList.length}份文章`)
              if (articleList.length < amount) { //判断已爬取的数量与需要的数量
                c.queue({
                  uri: `http://webapi.aixifan.com/query/article/list?pageNo=1&size=${baseAmount}&filterTitleImage=true`
                })
              } else {
                resolve(articleList)
              }
            } else {
              reject('crawler error')
            }
          } else {
            reject('crawler error')
          }
        }
        done()
      }
    })
    c.queue({
      uri: `http://webapi.aixifan.com/query/article/list?pageNo=1&size=${baseAmount}&filterTitleImage=false`
    })
  })
}

module.exports = {
  getUserList,
  getArticleList
}