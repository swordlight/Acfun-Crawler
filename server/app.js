const Http = require('http')
const router = require('./router.js')

const app = Http.createServer((req, res) => {
  let ctx = {req, res}
  router.resolve(ctx)
})

app.listen(3005, '127.0.0.1', () => {
  console.log('server has start listen at 127.0.0.1:3005')
})