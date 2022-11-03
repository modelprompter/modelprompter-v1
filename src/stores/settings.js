import {defineStore} from 'pinia'
// @todo Make these global
import {watch} from 'vue'
import {LocalStorage} from 'quasar'
import {defaultsDeep} from 'lodash-es'
import {useQuasar} from 'quasar'

export const useSettingsStore = defineStore('settings', () => {
  const $q = useQuasar()

  let settings = defaultsDeep(LocalStorage.getItem('settings') || {}, {
    servers: [],

    ui: {
      sidebar: {
        left: {
          open: false,
          maximized: false,
          wasOpened: false, // Caches state before right sidebar was opened
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

  // Force settings
  settings.ui.sidebar.left.open = !$q.platform.is.mobile
  settings.ui.sidebar.right.open = false
  settings.ui.sidebar.right.maximized = false

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
