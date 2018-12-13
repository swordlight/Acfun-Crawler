const http = require('http')

const app = http.createServer((req, res) => {
  
})

app.listen(3005, '127.0.0.1', () => {
  console.log('server has start listen at 127.0.0.1:3005')
})