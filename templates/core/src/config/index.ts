import { ConfigLoader } from 'gorila-core'

export default new ConfigLoader({
  LibClass: {
    message: 'Test LibClass!'
  },
  LibFun: {
    wait: true,
    message: 'Test LibFunction!'
  }
})