import { LibraryManager } from 'gorila-core'
import config from './../config'
import { Lib } from './lib'

export default new LibraryManager(config, [Lib])