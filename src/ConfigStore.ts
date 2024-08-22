import config from './config'
import type { Config } from './config-schema'
import { writable } from 'svelte/store'

export const SEARCH_PAGE_ID = 'settings-search'

export type ConfigStoreData = {
  config: Config
  path: string[]
}

function createStore() {
  const { subscribe, set, update } = writable<ConfigStoreData>({
    config,
    path: [config.sidebarNavigation[0] as string],
  })

  const goToPage = (pageId: string) => {
    update((store) => {
      store.path = [pageId]
      return store
    })
  }
  const goToSubpage = (pageId: string) => {
    update((store) => {
      store.path.push(pageId)
      return store
    })
  }

  const popToPage = (pageId: string) => {
    update((store) => {
      const index = store.path.indexOf(pageId)
      if (index !== -1) {
        store.path = store.path.slice(0, index + 1)
      }
      return store
    })
  }

  return {
    subscribe,
    goToPage,
    goToSubpage,
    popToPage,
  }
}

export default createStore()
