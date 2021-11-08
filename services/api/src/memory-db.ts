import { Data } from './types'

export const createMemoryDb = (initialData: Data) => {
  let data = { ...initialData }
  return {
    // any realistic replacement will be async so force that constraint here
    // even if not strictly needed in this case
    async get() {
      return data
    },

    async put(newData: Data) {
      data = newData
    },
  }
}
