import { SocketsControllers } from 'gorila-sockets'
import HomeController from './home.controller'

const controllers: SocketsControllers = [
  HomeController
]

export default controllers