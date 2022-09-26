import {defineStore} from 'pinia'

export const useLibraryStore = defineStore('library', () => {
  const workspaces = $ref({
    current: {}
  })
  const hasChanged = false

  return {workspaces, hasChanged}
})
