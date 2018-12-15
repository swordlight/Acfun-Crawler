const Url = require('url')
const Http = require('http')
const fs = require('fs')

class Controller {
  // dispatch(url, callback, ctx) {
  //   if (url === Url.parse(ctx.req.url).pathname) {
  //     callback(ctx)
  //   }
  // }
}


class UserController extends Controller {
  getSexInfo(ctx) {
    Http.get('http://www.acfun.cn/v/as7', (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          fs.unlinkSync('./test.html')
        } catch (error) {
          console.log(error)
        }
        
        try {
          fs.writeFileSync('./test.html', data)
        } catch (error) {
          console.log(error)
        }
        
      })
    })



    ctx.res.statusCode = 200
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