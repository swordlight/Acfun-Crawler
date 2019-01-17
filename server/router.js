const fs = require('fs')
const path = require('path')
const url = require('url')

let routers = () => {
  let routerMap = {}
  let routerFiles = fs.readdirSync(path.join(__dirname, 'routers'))
  for (const routerName of routerFiles) {
    let key = routerName.split('.')[0]
    routerMap[key] = require(`./routers/${routerName}`)()
  }
  return routerMap
}

let handle = (ctx, routers) => {
  const prefix = '/api/'
  let pathname = url.parse(ctx.request.url).pathname
  pathname = pathname.split(prefix)[1]
  let sort = pathname.split('/')[0]
  let func = pathname.split('/')[1]
  console.log(routers[sort][func])
  routers[sort][func](ctx.controllers)(ctx)
}

module.exports = {routers, handle}