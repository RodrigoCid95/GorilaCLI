import { HTTPServer } from 'gorila-http'
import Config from './config'
import controllers from './controllers'
import lm from './libraries'

(async () => {
  const server = new HTTPServer(Config, controllers, lm)
  await server.init()
})()
