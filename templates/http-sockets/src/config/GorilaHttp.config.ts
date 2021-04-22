import { ProfileGorilaHttp } from 'gorila-http'
import * as path from 'path'

const GorilaHttp: ProfileGorilaHttp = {
  engineTemplates: {
    name: 'pug',
    dirViews: path.normalize(`${__dirname}/../../views`),
    ext: 'pug',
    callback: require('pug').__express
  },
  pathsPublic: [
    {
      route: '/sockets',
      dir: `${__dirname}/../../public`
    }
  ]
}

export default GorilaHttp