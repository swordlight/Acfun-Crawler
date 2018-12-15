const Url = require('url')
const controller = require('./controller.js')
const {userController, commentController, flowController} = controller

module.exports = (ctx) => {
  let {req, res} = ctx
  let url = req.url
  let urlPath = Url.parse(url).path

  if (urlPath.startsWith('/api/user')) {
    userController.dispatch('/api/user/getSexInfo', userController.getSexInfo, ctx)
  } else if (urlPath.startsWith('/api/comment')) {
    commentController.dispatch(ctx)
  } else if (urlPath.startsWith('/api/flow')) {
    flowController.dispatch(ctx)
  }
}
