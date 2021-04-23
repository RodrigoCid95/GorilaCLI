import { LibraryFC } from "gorila-core";

const LibFun: LibraryFC<{ message: string; wait: boolean; }> = async ({ wait, message }) => {
  if (wait) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(message)
      }, 1000)
    })
  } else {
    return message
  }
}

export default LibFun