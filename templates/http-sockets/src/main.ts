import { SocketsServer } from 'gorila-sockets'
import { HTTPServer } from 'gorila-http'
import config from './config'
import lm from './libraries'
import httpControllers from './controllers/http'
import socketsControllers from './controllers/sockets'

(async () => {
  const httpServer = new HTTPServer(config, httpControllers, lm)
  await httpServer.init()
  const socketsServer = new SocketsServer(httpServer.httpServer, config, socketsControllers, lm)
  await socketsServer.init()
})()