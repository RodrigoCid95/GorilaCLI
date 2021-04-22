import { Library } from 'gorila-core'

export class Lib extends Library {
  build() {
    return new Promise((resolve => {
      this.log('Preparando librería...!')
      setTimeout(() => {
        resolve(this.profile.message)
      }, 1000)
    }))
  } 
}