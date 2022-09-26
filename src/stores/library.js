import {defineStore} from 'pinia'
import {watch} from 'vue'
import {LocalStorage} from 'quasar'
import defaultWorkspace from 'stores/workspaces/default'
import {throttle} from 'lodash-es'

export const useLibraryStore = defineStore('library', () => {
  const library = LocalStorage.getItem('library') || {}
  const workspaces = $ref(library.workspaces || [])
  const currentWorkspace = $ref(library.currentWorkspace || defaultWorkspace.library.currentWorkspace)

  const autosave = throttle(() => {
    LocalStorage.set('library', {workspaces, currentWorkspace})
  }, 250, {trailing: true})
  watch(workspaces, autosave)
  watch(currentWorkspace, autosave)

  function find (id) {
    // get workspace with id
    return workspaces.find(workspace => workspace.id === id)
  }

  return {workspaces, currentWorkspace, autosave, find}
})
