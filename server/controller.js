const Url = require('url')

class Controller {
  dispatch(url, callback, ctx) {
    if (url === Url.parse(ctx.req.url).pathname) {
      callback(ctx)
    }
  }
}


class UserController extends Controller {
  getSexInfo(ctx) {
    ctx.res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    ctx.res.write(JSON.stringify({ male: 80, female: 20 }))
    ctx.res.end()
  }
}

class CommentController {

}

class FlowController {

}

module.exports = {
  userController: new UserController(),
  commentController: new CommentController(),
  flowController: new FlowController()
}