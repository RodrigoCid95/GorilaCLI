import { LibraryManager, setModel } from 'gorila-core'
import config from './config'
import { Lib } from './libs/lib'
import { MainModel } from './models'

(async () => {
  const lm = new LibraryManager(config, [Lib])
  await lm.build();
  class Main {
    @setModel(MainModel, lm) model: MainModel;
    constructor() {
      console.log(this.model.getMessage())
    }
  }
  new Main();
})()