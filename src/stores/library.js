import {defineStore} from 'pinia'
import {watch} from 'vue'
import {LocalStorage} from 'quasar'
import defaultWorkspace from 'stores/workspaces/default'
import {throttle} from 'lodash-es'
import {Notify} from 'quasar'

// Library version
const version = '0.0.10'

export const useLibraryStore = defineStore('library', () => {
  let library = LocalStorage.getItem('library') || {}

  // Make sure blocks will work
  if ((!library?.version || library?.version < version || library?.version === '1.0') && library.workspaces) {
    console.log('CLEAR', library)
    if (library.version) {
      console.log('UPDATE')
      Notify.create({
        message: 'Model Prompter has had a major update to the API and has reset all settings (sorry about that).',
        color: 'negative',
        timeout: 6000
      })
    }

    localStorage.clear()
    library = {}
  }

  // Load default workspace if it doesn't exist
  let _currentWorkspace
  let _workspaces

  if (!library.currentWorkspace) {
    _currentWorkspace = defaultWorkspace.library?.currentWorkspace || defaultWorkspace.library?.workspaces[0]
    _workspaces = defaultWorkspace.library?.workspaces || []
  } else {
    _currentWorkspace = library.currentWorkspace
    _workspaces = library.workspaces || []
  }

  const currentWorkspace = $ref(_currentWorkspace)
  const workspaces = $ref(_workspaces)

  const autosave = throttle(() => {
    LocalStorage.set('library', {workspaces, currentWorkspace, version})
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
