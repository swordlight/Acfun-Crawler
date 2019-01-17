const fs = require('fs')
const path = require('path')

let controllers = {}
let services = {}
let controllerFiles = fs.readdirSync(path.join(__dirname, './controllers'))
let serviceFiles = fs.readdirSync(path.join(__dirname, './services'))

for (const serviceName of serviceFiles) {
  let key = serviceName.split('.')[0]
  services[key] = require(`./services/${serviceName}`)()
}
for (const controllerName of controllerFiles) {
  let key = controllerName.split('.')[0]
  controllers[key] = require(`./controllers/${controllerName}`)(services)
}

module.exports = {services, controllers}