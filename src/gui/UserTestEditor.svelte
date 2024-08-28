<script lang="ts">
  import MozToggleable from '@src/atoms/MozToggleable.svelte'
  import usertestStore from '@src/UsertestStore'
  import PageInput from './input/PageInput.svelte'
  import MozButton from '@src/atoms/MozButton.svelte'
  import configStore from '@src/ConfigStore'
  import prefStore from '@src/PrefStore'
  import PrefInput from './input/PrefInput.svelte'

  function removePathItem(index: number) {
    if ($usertestStore.startPath.length === 1) return
    $usertestStore.startPath.splice(index, 1)
    $usertestStore = $usertestStore
  }
  function addPathItem() {
    $usertestStore.startPath.push($configStore.config.sidebarNavigation[0])
    $usertestStore = $usertestStore
  }
  function removeAllowedPage(index: number) {
    $usertestStore.allowedPages.splice(index, 1)
    $usertestStore = $usertestStore
  }
  function addAllowedPage() {
    $usertestStore.allowedPages.push($configStore.config.sidebarNavigation[0])
    $usertestStore = $usertestStore
  }
</script>

<div class="form">
  <label for="enabled">Usertesting mode enabled</label>
  <MozToggleable
    id="enabled"
    type="switch"
    bind:checked={$usertestStore.enabled}
  />
  <span>Start path</span>
  <div class="path">
    {#each $usertestStore.startPath as step, index}
      <div class="item">
        <PageInput
          id="path-{index}"
          bind:valueObj={$usertestStore.startPath}
          valueKey={`${index}`}
        />
        <MozButton iconName="close-16" on:click={() => removePathItem(index)} />
      </div>
    {/each}
    <MozButton iconName="add-16" on:click={addPathItem}>Add</MozButton>
  </div>
  <label for="restrict-pages">Restrict which pages can be visited</label>
  <MozToggleable
    id="restrict-pages"
    type="switch"
    bind:checked={$usertestStore.restrictPages}
  />
  <span>Allowed pages</span>
  <div class="path">
    {#each $usertestStore.allowedPages as page, index}
      <div class="item">
        <PageInput
          id="allowed-page-{index}"
          bind:valueObj={$usertestStore.allowedPages}
          valueKey={`${index}`}
        />
        <MozButton iconName="close-16" on:click={() => removeAllowedPage(index)} />
      </div>
    {/each}
    <MozButton iconName="add-16" on:click={addAllowedPage}>Add</MozButton>
  </div>
  <label for="allow-external-link">Allow external links to be visited</label>
  <MozToggleable
    id="allow-external-link"
    type="switch"
    bind:checked={$usertestStore.allowExternalLinks}
  />
</div>

<style lang="sass">

.form
  display: grid
  margin: utils.$size-16
  grid-template-columns: 35% 1fr
  gap: utils.$size-16
  align-items: start
  padding-inline-start: calc(var(--indent) * (utils.$size-8 + utils.$size-16))

.path
  display: flex
  flex-direction: column
  gap: utils.$size-8
  padding: utils.$size-8
  border: 1px solid var(--border-color-default)
  border-radius: var(--border-radius-medium)
  .item
    display: flex
    gap: utils.$size-8
    align-items: center

</style>
