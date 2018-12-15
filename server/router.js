const Url = require('url')
const controller = require('./controller.js')
const {userController, commentController, flowController} = controller

class Router {
  resolve(ctx) {
    let urlPath = Url.parse(ctx.req.url).path
    ctx.res.setHeader('Content-Type', 'application/json')
    switch (urlPath) {
      case '/api/user/getSexInfo':
        userController.getSexInfo(ctx)
        break
      default:
        ctx.res.status(200)
        ctx.res.write( JSON.stringify({ message: 'not found' }))
        break
    }
  }
}

module.exports = new Router()