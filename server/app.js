const Http = require('http')
const loader = require('./loader.js')
const router = require('./router.js')

const routers = router.routers()
const handle = router.handle
const app = Http.createServer((request, response) => {
  let ctx = {request, response}
  ctx.controllers = loader.controllers
  ctx.services = loader.services
  handle(ctx, routers)
})

app.listen(3005, '127.0.0.1', () => {
  console.log('server has start listen at 127.0.0.1:3005')
})