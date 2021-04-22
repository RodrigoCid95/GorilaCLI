import { ConfigLoader } from 'gorila-core'
import GorilaHttp from './GorilaHttp.config'

export default new ConfigLoader({
  GorilaHttp,
  Lib: {
    message: 'Hola Gorila!'
  }
})