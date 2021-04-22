import { ConfigLoader } from 'gorila-core'
import GorilaHttp from './GorilaHttp.config'
import GorilaSockets from './GorilaSockets.config'

export default new ConfigLoader({
  GorilaHttp,
  GorilaSockets,
  Lib: {
    message: 'Hola Gorila!'
  }
})