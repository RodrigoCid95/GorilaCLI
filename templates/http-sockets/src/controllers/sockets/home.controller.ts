import { setModel } from 'gorila-core'
import { On, SocketsController } from 'gorila-sockets'
import HomeModel from './../../models/home.model'
class HomeController extends SocketsController {
  @setModel(HomeModel) model: HomeModel;
  @On('message')
  /**
   * message
   */
  public message(firstGreeting: string, secondGreeting: string) {
    console.log(firstGreeting, secondGreeting)
    return this.model.getMessage()
  }
}

export default HomeController