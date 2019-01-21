module.exports = () => ({
  json: (ctx, data) => {
    let {response} = ctx
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })
    response.write(JSON.stringify(data))
    response.end()
  }
})