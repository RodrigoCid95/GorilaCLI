import { setModel } from 'gorila-core'
import lm from './libs'
import { MainModel } from './models'

(async () => {
  await lm.build();
  class Main {
    @setModel(MainModel, lm) model: MainModel;
    constructor() {
      console.log(this.model.libClass, this.model.libFun)
    }
  }
  new Main();
})()