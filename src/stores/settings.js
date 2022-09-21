import {defineStore} from 'pinia'
// @todo Make these global
import {watch} from 'vue'
import {LocalStorage} from 'quasar'

export const useSettingsStore = defineStore('counter', () => {
  let localData = LocalStorage.getItem('settings') || {}

  /**
   * Saves this store locally
   */
  const autosave = function () {
    LocalStorage.set('settings', {
      servers
    })
  }

  /**
   * Servers
   */
  const servers = $ref(localData.servers || [
  ])
  watch(servers, autosave)

  return {
    servers
  }
})
