import {defineStore} from 'pinia'
// @todo Make these global
import {watch} from 'vue'
import {LocalStorage} from 'quasar'
import {defaultsDeep} from 'lodash-es'

export const useSettingsStore = defineStore('settings', () => {
  let settings = defaultsDeep(LocalStorage.getItem('settings') || {}, {
    servers: [],

    ui: {
      sidebar: {
        left: {
          open: false,
          maximized: false,
        },
        right: {
          open: false,
          maximized: false
        }
      },

      toolbar: {
        toggleBlocksWorkspaceRef: null
      }
    }
  })

  /**
   * Saves this store locally
   */
  const autosave = function () {
    LocalStorage.set('settings', {servers, ui})
  }

  // Servers
  const servers = $ref(settings.servers)
  watch(servers, autosave)

  // UI
  // Closes expanded sidebars when the sidebar itself closes
  const ui = $ref(settings.ui)
  watch(ui, () => {
    if (!ui.sidebar.left.open) ui.sidebar.left.maximized = false
    else if (!ui.sidebar.right.open) ui.sidebar.right.maximized = false

    autosave()
  })

  return {servers, ui}
})
