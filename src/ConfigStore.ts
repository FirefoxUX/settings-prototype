import type { Config } from './config-schema'
import config from './config.json'
import { writable } from 'svelte/store'

export const SEARCH_PAGE_ID = 'settings-search'

export type ConfigStoreData = {
  config: Config
  path: string[]
}

function validatePageId(pageId: string, config: Config) {
  return !!config.pageDefinitions[pageId]
}

function createStore() {
  const { subscribe, set, update } = writable<ConfigStoreData>({
    config: config as Config,
    path: [config.sidebarNavigation[0] as string],
  })

  const goToPage = (pageId: string) => {
    // validate pageId first
    update((store) => {
      if (validatePageId(pageId, store.config)) {
        store.path = [pageId]
      }
      return store
    })
  }
  const goToSubpage = (pageId: string) => {
    update((store) => {
      if (validatePageId(pageId, store.config)) {
        store.path.push(pageId)
      }
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

  // wrapper for set for logging
  // const setWrapper = (data: ConfigStoreData) => {
  //   console.log('set', data)
  //   set(data)
  // }

  const forceUpdate = () => {
    update((store) => ({ ...store }))
  }

  return {
    subscribe,
    goToPage,
    goToSubpage,
    popToPage,
    update,
    set,
    forceUpdate,
  }
}

export default createStore()
