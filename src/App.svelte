<script lang="ts">
  import PageNavigation from '@src/components/PageNavigation.svelte'
  import SettingsPage from './generated/SettingsPage.svelte'
  import DataEditorUI from './gui/DataEditorUI.svelte'

  let showDataEditor = false

  function keydownListener(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
      e.preventDefault()
      showDataEditor = !showDataEditor
    }
  }
</script>

<svelte:window on:keydown={keydownListener} />

<div class="wrapper" class:show-editor={showDataEditor}>
  <div class="settings-layout">
    <PageNavigation />

    <main>
      <SettingsPage />
    </main>
  </div>
  {#if showDataEditor}
    <DataEditorUI on:close={() => showDataEditor = false} />
  {/if}
</div>

<style lang="sass">

.wrapper.show-editor
  display: flex
  gap: utils.$size-48
  justify-content: center

.settings-layout
  display: flex
  gap: utils.$size-48
  justify-content: center

main
  width: 600px
  margin-block: utils.$size-64
  display: flex
  flex-direction: column
  gap: utils.$size-24

</style>
