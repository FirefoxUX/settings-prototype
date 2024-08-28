import usertestConfig from './usertest.json'
import { writable } from 'svelte/store'

export const defaultConfig = usertestConfig as UserTestData

export interface UserTestData {
  enabled: boolean
  startPath: string[]
  restrictPages: boolean
  allowedPages: string[]
  allowExternalLinks: boolean
}

function createStore() {
  const { subscribe, set, update } = writable<UserTestData>({ ...defaultConfig })

  return {
    subscribe,
    set,
  }
}

export default createStore()
