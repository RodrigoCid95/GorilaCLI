import * as http from 'http'
import { SocketsServer } from 'gorila-sockets'
import config from './config'
import lm from './libraries'
import controllers from './controllers'

(async () => {
  const server = http.createServer()
  const socketsServer = new SocketsServer(server, config, controllers, lm)
  await socketsServer.init()
  server.listen(3000)
})()