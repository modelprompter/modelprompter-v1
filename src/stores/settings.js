import {defineStore} from 'pinia'
// Make these global
import {watch} from 'vue'
import {LocalStorage} from 'quasar'

export const useSettingsStore = defineStore('counter', () => {
  /**
   * Saves this store locally
   */
  const autosave = function () {
    LocalStorage.set('settings', servers)
  }

  // Servers
  const localData = LocalStorage.getItem('settings')
  const servers = $ref(localData || [
    {
      base: 'http://localhost:7860/',
      enabled: true,
      api: 'AUTOMATIC1111-2'
    }
  ])
  watch(servers, autosave)

  return {
    servers,
    autosave
  }
})
