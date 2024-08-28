import UsertestStore, { type UserTestData } from './UsertestStore'
import prefs from './prefs.json'
import { writable } from 'svelte/store'

let userTestData: UserTestData
UsertestStore.subscribe((data) => {
  userTestData = data
})

export const defaultPrefs = prefs as PrefData

export type PrefData = { [key: string]: number | string | boolean }
export type PrefDataAny = { [key: string]: any }

function createStore() {
  const { subscribe, set, update } = writable<PrefDataAny>({ ...defaultPrefs })

  const setPref = (key: string, value: number | string | boolean) => {
    update((store) => {
      store[key] = value
      return store
    })
  }

  const resetPref = (key: string) => {
    if (defaultPrefs[key] !== undefined) {
      setPref(key, defaultPrefs[key])
    } else {
      update((store) => {
        delete store[key]
        return store
      })
    }
  }

  const toggleBooleanPref = (key: string) => {
    if (typeof defaultPrefs[key] !== 'boolean') {
      return
    }
    update((store) => {
      store[key] = !store[key]
      return store
    })
  }


  return {
    subscribe,
    setPref,
    set,
    resetPref,
    toggleBooleanPref,
  }
}

export default createStore()
