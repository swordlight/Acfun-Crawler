module.exports = () => ({
  bodyParse: (ctx) => {
    return new Promise((resolve, reject) => {
      let {request} = ctx
      let data = ''
      request.on('error', (e) => {
        reject(e)
      })
      request.on('data', (chunk) => {
        data += chunk
      })
      request.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch(e) {
          reject(e)
        }
      })
    })
  }
})