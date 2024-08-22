import type { PageContent } from './generated/SettingsPage.svelte'

export const SEPARATOR = Symbol('separator')

export type Config = {
  pageDefinitions: { [id: string]: PageDefinition }
  sidebarNavigation: SidebarNavigation
}

export type PageDefinition = {
  title: string
  icon?: string
  content: PageContent[]
}

export type SidebarNavigation = (string | typeof SEPARATOR)[]

export type { PageContent }
