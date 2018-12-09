const HttpProxy = require('http-proxy')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const http = require('http')
const config = require('../server.json')

let sendText = (status, text, req, res) => {
  res.writeHead(status, {'Content-Type': 'text/plain'})
  res.write(text)
  res.end()
}

let sendFile = (filePath, req, res) => {
  console.log(filePath)
  try {
    let stats = fs.accessSync(filePath)
  }
  catch(e) {
    console.log(e)
    if (config.mode === 'history') {
      filePath = path.join(__dirname, '../dist/index.html')
    } else {
      return sendText(404, '404 - Not Found', req, res)
    }
  }
  let stats
  try {
    let stats = fs.accessSync(filePath)
    // console.log(stats)
    // if (stats.isDirectory()) {
    //   return sendText(403, 'forbidden', req, res)
    // }
    mimeType = mime.getType(filePath)
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Server': 'Emily'
    })
    fs
      .createReadStream(filePath)
      .pipe(res)
  }
  catch(e) {
    console.log(e)
    return sendText(500, '500 - read error', req, res)
  }
}

const proxy = HttpProxy.createProxyServer({})

proxy.on('error', (err, req, res) => {
  console.log(err)
  res.writeHead(500)
  res.write('')
})

const server = http.createServer((req, res) => {
  let reqUrl = req.url
  let reqPath = reqUrl.split('?')[0]
  let isLocal = false

  if (reqPath === '/') {
    return sendFile(path.join(__dirname, '../dist/index.html'), req, res)
  }
  if (reqPath === '/favicon.ico') {
    return sendFile(path.join(__dirname, './favicon.ico'), req, res)
  }
  
  config.local.forEach((item, index) => {
    if (reqPath.startsWith(item)) {
      isLocal = true
      return
    }
  })

  if (isLocal) {
    let filePath = path.join(__dirname, '../', reqPath)
    return sendFile(filePath, req, res)
  } else if (reqPath.startsWith(config.api)) {
    proxy.web(req, res, {
      changeOrigin: true,
      target: config.proxy
    })
  } else {
    return sendFile(path.join(__dirname, '../dist/index.html'), req, res)
  }
})

server.on('error', err => {
  console.log(err)
})

server.listen(config.port)

console.log(`Debug server listening on 127.0.0.1:${config.port}`)