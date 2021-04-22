import { setModel } from 'gorila-core'
import { Get, HTTPController, Post, Request, Response } from 'gorila-http'
import HomeModel from './../../models/home.model'

export default class HomeController extends HTTPController {
  @setModel(HomeModel) model: HomeModel;
  @Get('/')
  public getIndex(req: Request, res: Response) {
    res.render('index', { title: 'Ejemplo get http', message: this.model.getMessage() })
  }
  @Post('/')
  public postIndex(req: Request, res: Response) {
    res.render('index', { title: 'Ejemplo post http', message: this.model.getMessage() })
  }
}