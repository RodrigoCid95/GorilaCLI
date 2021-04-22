import { ConfigLoader } from 'gorila-core'
import GorilaSockets from './GorilaSockets.config'

export default new ConfigLoader({
  GorilaSockets,
  Lib: {
    message: 'Hello client!'
  }
});