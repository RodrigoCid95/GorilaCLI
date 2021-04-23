import { Library } from 'gorila-core'

export class LibClass extends Library<{message: string;}> {
  build() {
    return new Promise((resolve => {
      this.log('Preparando librería...!')
      setTimeout(() => {
        resolve(this.profile.message)
      }, 1000)
    }))
  } 
}