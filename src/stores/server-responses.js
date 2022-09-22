import {defineStore} from 'pinia'

export const useServerResponses = defineStore('serverResponses', () => {
  const data = $ref([])

  return {
    data
  }
})
