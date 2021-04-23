import { LibraryManager } from 'gorila-core'
import config from './../config'
import { LibClass } from './libClass'
import LibFun from './libFun'

export default new LibraryManager(config, [
  LibClass,
  LibFun
])