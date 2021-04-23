import { Model, setLib } from 'gorila-core'
export class MainModel extends Model {
  @setLib('LibFun') libFun: any
  @setLib('LibClass') libClass: any
}