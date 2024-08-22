import { SEPARATOR, type Config } from '../config-schema'
import * as privacyAndSecurity from './privacy-and-security'
import * as privacyAndSecurityAdvanced from './privacy-and-security-advanced'

const sidebarNavigation: Config['sidebarNavigation'] = [
  'your-firefox',
  'home-and-startup',
  'search',
  privacyAndSecurity.id,
  'autofill-and-passwords',
  'browsing',
  'accessibility',
  'languages',
  'permissions-and-data',
  'firefox-labs',
  SEPARATOR,
  'about-firefox',
  'extensions-and-themes',
]

const pageDefinitions: Config['pageDefinitions'] = {
  'your-firefox': {
    title: 'Your Firefox',
    icon: 'avatar-signed-out-16',
    content: [],
  },
  'home-and-startup': {
    title: 'Home & Startup',
    icon: 'home-16',
    content: [],
  },
  search: {
    title: 'Search',
    icon: 'search-16',
    content: [],
  },
  [privacyAndSecurity.id]: privacyAndSecurity.pageDefinition,
  [privacyAndSecurityAdvanced.id]: privacyAndSecurityAdvanced.pageDefinition,
  'autofill-and-passwords': {
    title: 'Autofill & Passwords',
    icon: 'login-16',
    content: [],
  },
  browsing: {
    title: 'Browsing',
    icon: 'cursor-arrow-16',
    content: [],
  },
  accessibility: {
    title: 'Accessibility',
    icon: 'accessibility-16',
    content: [],
  },
  languages: {
    title: 'Languages',
    icon: 'translation-16',
    content: [],
  },
  'permissions-and-data': {
    title: 'Permissions & Data',
    icon: 'permission-16',
    content: [],
  },
  'firefox-labs': {
    title: 'Firefox Labs',
    icon: 'labs-16',
    content: [],
  },
  'about-firefox': {
    title: 'About Firefox',
    icon: 'firefox-flat-16',
    content: [],
  },
  'extensions-and-themes': {
    title: 'Extensions and themes',
    icon: 'extension-16',
    content: [],
  },
}

const config: Config = {
  pageDefinitions,
  sidebarNavigation,
}

export default config
