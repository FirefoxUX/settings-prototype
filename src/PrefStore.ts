import prefs from './prefs'
import { writable } from 'svelte/store'

export type PrefData = { [key: string]: number | string | boolean }
export type PrefDataAny = { [key: string]: any }

function createStore() {
  const { subscribe, set, update } = writable<PrefDataAny>(prefs)

  const setPref = (key: string, value: number | string | boolean) => {
    update((store) => {
      store[key] = value
      return store
    })
  }

  return {
    subscribe,
    setPref,
    set,
  }
}

export default createStore()
