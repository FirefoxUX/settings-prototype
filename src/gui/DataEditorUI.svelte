<script lang="ts">
  import MozButton from '@src/atoms/MozButton.svelte'
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import Prefs from './PrefEditor.svelte'
  import Navigation from './NavigationEditor.svelte'
  import PageEditor from './PageEditor.svelte'
  import Export from './Export.svelte'

  const SCREENS = [
    { value: 'prefs', label: 'Prefs' },
    { value: 'pages', label: 'Pages' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'export', label: 'Config export' },
  ]

  let selectedScreen = 'pages'
</script>

<section class="controls moz-card">
  <nav>
    <div class="group">
      <h1>Settings editor</h1>
      <MozDropdown id="dropdown" bind:value={selectedScreen} items={SCREENS} />
    </div>

    <MozButton type="ghost" iconName="close-16" />
  </nav>
  <main>
    {#if selectedScreen === 'prefs'}
      <Prefs />
    {:else if selectedScreen === 'pages'}
      <PageEditor />
    {:else if selectedScreen === 'navigation'}
      <Navigation />
    {:else if selectedScreen === 'export'}
      <Export />
    {/if}
  </main>
</section>

<style lang="sass">

section
  --border-color-default: #0C66FF
  display: flex
  flex: 1
  margin: utils.$size-16
  height: calc(100vh - utils.$size-32)
  box-sizing: border-box
  flex-direction: column
  background-color: light-dark(#D1E2FF, #021331)
  border: 1px solid #0C66FF
  overflow: hidden
  > nav, > nav .group
    display: flex
    align-items: center
    gap: utils.$size-12
  > nav
    justify-content: space-between
    border-bottom: 1px solid #0C66FF
    padding: utils.$size-12
  > main
    flex: 1
    overflow-y: auto


</style>
