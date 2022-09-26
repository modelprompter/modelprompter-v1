import {defineStore} from 'pinia'

export const useDatafeedResponses = defineStore('datafeed', () => {
  const data = $ref([])
  const onEndMethods = $ref([])
  const isRunning = $ref(false)
  const hasRanLastMethods = $ref(false)

  return {data, onEndMethods, isRunning, hasRanLastMethods}
})
