import {defineStore} from 'pinia'
import {watch} from 'vue'
import {LocalStorage} from 'quasar'
import defaultWorkspace from 'stores/workspaces/default'

export const useLibraryStore = defineStore('library', () => {
  const library = LocalStorage.getItem('library') || {}
  const workspaces = $ref(library.workspaces || [])
  const currentWorkspace = $ref(library.currentWorkspace || defaultWorkspace.library.currentWorkspace)

  function autosave () {
    console.log('autosave')
    LocalStorage.set('library', {workspaces, currentWorkspace})
  }
  watch(workspaces, autosave)
  watch(currentWorkspace, autosave)

  function find (id) {
    // get workspace with id
    return workspaces.find(workspace => workspace.id === id)
  }

  return {workspaces, currentWorkspace, autosave, find}
})
