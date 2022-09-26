import {defineStore} from 'pinia'
import {watch} from 'vue'
import {LocalStorage} from 'quasar'
import defaultWorkspace from 'stores/workspaces/default'

export const useLibraryStore = defineStore('library', () => {
  const library = LocalStorage.getItem('library') || {}
  const workspaces = $ref(library.workspaces || {})
  if (!workspaces.current) {
    workspaces.current = defaultWorkspace.current
  }

  function autosave () {
    LocalStorage.set('library', {workspaces})
  }
  watch(workspaces, autosave)

  return {workspaces}
})
