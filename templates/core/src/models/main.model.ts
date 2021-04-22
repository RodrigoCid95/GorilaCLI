import { Model, setLib } from 'gorila-core'
export class MainModel extends Model {
  @setLib('Lib') private lib: any;
  public getMessage() {
    return this.lib
  }
}