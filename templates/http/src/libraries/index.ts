import Config from './../config'
import { LibraryManager } from 'gorila-core'
import { Lib } from './lib'

export default new LibraryManager(Config, [Lib])