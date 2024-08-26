import prefStore from './PrefStore'

let idCounter = 0

// this function generates a unique id for form elements
export function generateId() {
  return `id-${idCounter++}`
}

export function removeObjectKey<T extends object>(obj: T, key: keyof T): T {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => k !== key)) as T
}

export function boolInv(value: boolean, invert?: boolean): boolean {
  return invert ? !value : value
}

export type DisabledByPref = {
  pref: string
  invert?: boolean
  matchValue?: any
}
