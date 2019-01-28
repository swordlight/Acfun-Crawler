let allArticleList = require('../data/article-list.json')

module.exports = (services) => ({
  /**
   * 获取不同评论数量区间内的文章数量
   */
  getCommentAmountAreaProportion: async (ctx) => {
    let requestData = await services.request.bodyParse(ctx)
    let articleList = [...allArticleList]
    if (requestData.amount) {
      articleList = articleList.slice(0, requestData.amount)
    }
    const commentAmountAreaList = [[0, 49], [50, 99], [100, 199], [200, 299], [300, 499], [500, 699], [700, 999], [1000, 100000]]
    let proportionValueList = (new Array(commentAmountAreaList.length)).fill(0)
    for (const article of articleList) {
      let comment = article.comment_count
      let areaIndex = commentAmountAreaList.findIndex(item => (comment >= item[0] && comment <= item[1]))
      proportionValueList[areaIndex] += 1
    }
    services.response.json(ctx, {stat: 'ok', data: {areaList: commentAmountAreaList, amountList: proportionValueList}})
  },
})