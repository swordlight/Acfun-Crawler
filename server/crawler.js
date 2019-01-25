const Crawler = require('crawler')

let getUserList = () => {
  
}

/**
 * 
 * @param amount 文章数量 最大10000
 */
let getArticleList = (amount) => {
  return new Promise((resolve, reject) => {
    amount = amount ? amount : 10000
    let c = new Crawler({
      jQuery: false
    })
    c.queue({
      uri: `http://webapi.aixifan.com/query/article/list?pageNo=1&size=${amount}&filterTitleImage=false`,
      callback: (err, res, done) => {
        if(err) {
          reject(err)
        } else {
          resolve(res)
        }
        done()
      }
    })
  })
}

module.exports = {
  getUserList,
  getArticleList
}