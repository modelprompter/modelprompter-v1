import {defineStore} from 'pinia'

export const useDatafeedResponses = defineStore('datafeedResponses', () => {
  const data = $ref([])
  const onEndMethods = $ref([])
  return {data, onEndMethods}
})
