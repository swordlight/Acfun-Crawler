const fs = require('fs')
const path = require('path')
const url = require('url')
const crawler = require('./crawler.js')

let routers = () => {
  let routerMap = {}
  let routerFiles = fs.readdirSync(path.join(__dirname, 'routers'))
  for (const routerName of routerFiles) {
    let key = routerName.split('.')[0]
    routerMap[key] = require(`./routers/${routerName}`)()
  }
  return routerMap
}

/**
 * url = '/api/sort/func'
 */

let handle = async (ctx, routers) => {
  try {
    let pathname = url.parse(ctx.request.url).pathname
    console.log(`recive request---   ${pathname}`)
    let result = await specialUrlMath(ctx, pathname)
    if (result === 'end') {
      return
    }
    if (result === 'next') {
      try {
        const prefix = '/api/'
        pathname = pathname.split(prefix)[1]
        let sort = pathname.split('/')[0]
        let func = pathname.split('/')[1]
        routers[sort][func](ctx.controllers)(ctx)
      } catch(e) {
        console.log(e)
        ctx.services.response.json(ctx, {stat: '404 NotFound'})
      }      
    }
  } catch(e) {
    console.log(e)
    ctx.services.response.json(ctx, {stat: '500 ServiceError'})
  }
}

//special url match

let specialUrlMath = (ctx, pathname) => {
  return new Promise(async (resolve, reject) => {
    let {request, response} = ctx
    switch (pathname) {
      case '/favicon.ico':
        response.writeHead(200, {
          'Content-Type': 'image/x-icon'
        })
        let stream = fs.createReadStream('./public/img/favicon2.ico')
        let fileData = []
        stream.on('error', (e) => {
          reject(e)
        })
        stream.on('data', (chunk) => {
          fileData.push(chunk)
        })
        stream.on('end', () => {
          fileData = Buffer.concat(fileData)
          response.write(fileData, 'binary')
          response.end()
          resolve('end')
        })
        return
      case '/zzpzds':
        try {
          let articleList = await crawler.getArticleList(10000)
          articleList = JSON.stringify(articleList, null, 2)
          let articleListBuffer = Buffer.from(articleList)
          let articleListStream = fs.createWriteStream('./data/article-list.json')
          articleListStream.on('error', (e) => {
            reject(e)
          })
          articleListStream.write(articleListBuffer)
          articleListStream.end()

          ctx.services.response.json(ctx, {articleList})
        } catch(e) {
          reject(e)
        }
        resolve('end')
        return
      default:
        resolve('next')
    }
  })
}

module.exports = {routers, handle}