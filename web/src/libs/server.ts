class Server {
  request<T, U = {}>(option: { url: string, data?: U, method?: string }): Promise<T> {
    const prefix = 'http://127.0.0.1:3003'
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      let url = `${prefix}${option.url}`
      xhr.open(option.method || 'POST', url)
      xhr.setRequestHeader('Content-Type', 'application/json')
    
      xhr.onload = () => {
        let data = JSON.parse(xhr.responseText)
        resolve(data)
      }
      xhr.onerror = (err) => {
        reject(err)
      }

      xhr.send(JSON.stringify(option.data))
    })
  }
}

export default new Server()