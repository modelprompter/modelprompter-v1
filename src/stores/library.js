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

  // get workspace with id
  function find (id) {
    return workspaces.find(workspace => workspace.id === id)
  }
  // Get the index of a workspace by id
  function findIndex (id) {
    return workspaces.findIndex(workspace => workspace.id === id)
  }

  return {workspaces, currentWorkspace, autosave, find, findIndex}
})
