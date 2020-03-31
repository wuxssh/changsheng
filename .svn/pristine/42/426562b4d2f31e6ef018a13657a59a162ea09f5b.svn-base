'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let params = process.argv[4]
let baseUrl = ''
switch (params) {
  case '--env=sit':
    baseUrl = '"http://172.18.100.187:7040/api"'
    break
  case '--env=uat':
    baseUrl = '"http://172.18.100.64:7040/api"'
    break
  case '--env=prod':
    baseUrl = '"http://192.168.100.238:7040/api"'
    break
  default:
    baseUrl = '"http://172.18.100.187:7040/api"'
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  baseUrl: baseUrl
})
