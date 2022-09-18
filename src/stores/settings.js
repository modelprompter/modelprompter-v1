import {defineStore} from 'pinia'

export const useSettingsStore = defineStore('counter', () => {
  const servers = ref([
    {
      base: 'http://localhost:7860/',
      enabled: true,
      api: 'AUTOMATIC1111-2'
    }
  ])

  return {servers}
})
