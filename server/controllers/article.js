let allArticleList = require('../data/article-list.json')

module.exports = (services) => ({
  getArticleTypeProportion: async (ctx) => {
    let requestData = await services.request.bodyParse(ctx)
    let articleList = [...allArticleList]
    if (requestData.amount) {
      articleList = articleList.slice(0, requestData.amount)
    }
    let resultMap = new Map()
    articleList.forEach(item => {
      let type = item.channel_name
      if (resultMap.has(type)) {
        let prevent = resultMap.get(type)
        resultMap.set(type, prevent + 1)
      } else {
        resultMap.set(type, 1)
      }
    })
    let resultList = []
    for (const item of resultMap.entries()) {
      let obj = {
        type: item[0],
        proportion: item[1],
      }
      resultList.push(obj)
    }
    services.response.json(ctx, {stat: 'ok', data: resultList})
  }
}) 