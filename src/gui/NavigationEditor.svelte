<script lang="ts">
  import MozButton from '@src/atoms/MozButton.svelte'
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import MozIcon from '@src/atoms/MozIcon.svelte'
  import MozInput from '@src/atoms/MozInput.svelte'
  import { SEPARATOR } from '@src/config-schema'
  import configStore from '@src/ConfigStore'

  $: addOptions = [
    ...Object.keys($configStore.config.pageDefinitions)
      .filter((page) => !$configStore.config.sidebarNavigation.includes(page))
      .map((page) => ({
        value: page,
        label: $configStore.config.pageDefinitions[page].title,
      })),
    {
      value: '__separator__',
      label: '[Separator]',
    },
  ]

  let selectedOption: string | undefined = undefined

  function updateSelectedOption(addOptions: any[]) {
    selectedOption = addOptions[0]?.value
  }

  $: updateSelectedOption(addOptions)

  function addNavItem() {
    if (selectedOption === undefined) return
    configStore.update((store) => {
      store.config.sidebarNavigation.push(
        selectedOption === '__separator__' ? SEPARATOR : selectedOption!,
      )
      return store
    })
  }

  function removeNavItem(index: number) {
    configStore.update((store) => {
      store.config.sidebarNavigation.splice(index, 1)
      return store
    })
  }

  function moveNavItem(index: number, direction: number) {
    configStore.update((store) => {
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= store.config.sidebarNavigation.length)
        return store
      const temp = store.config.sidebarNavigation[index]
      store.config.sidebarNavigation[index] =
        store.config.sidebarNavigation[newIndex]
      store.config.sidebarNavigation[newIndex] = temp
      return store
    })
  }
</script>

<div class="list">
  {#each $configStore.config.sidebarNavigation as sidebarItem, i}
    <div class="item">
      {#if sidebarItem === SEPARATOR}
        ------
      {:else}
        {#if $configStore.config.pageDefinitions[sidebarItem].icon}
          <MozIcon
            name={$configStore.config.pageDefinitions[sidebarItem].icon}
          />
        {/if}
        {$configStore.config.pageDefinitions[sidebarItem].title}
      {/if}
      <div class="controls">
        <MozButton
          title="Move up"
          iconName="chevron-up-16"
          on:click={() => moveNavItem(i, -1)}
        />
        <MozButton
          title="Move down"
          iconName="chevron-down-16"
          on:click={() => moveNavItem(i, 1)}
        />
        <MozButton
          title="Remove"
          iconName="close-16"
          on:click={() => removeNavItem(i)}
        />
      </div>
    </div>
  {/each}
</div>

<div class="add">
  <p>Add page to sidebar:</p>
  <MozDropdown id="dropdown" items={addOptions} bind:value={selectedOption} />
  <MozButton on:click={addNavItem}>Add</MozButton>
</div>

<style lang="sass">

.add
  display: flex
  gap: utils.$size-8
  align-items: center
  margin: utils.$size-16

.list
  margin: utils.$size-16
  display: flex
  flex-direction: column
  border: 1px solid var(--border-color-default)
  border-radius: var(--border-radius-small)

.item
  padding: utils.$size-8
  display: flex
  align-items: center
  gap: utils.$size-8
  &:not(:last-child)
    border-bottom: 1px solid var(--border-color-default)
  &:nth-child(odd)
    background-color: rgba(12, 12, 13, 0.05)

.controls
  display: flex
  gap: utils.$size-8
  margin-left: auto

</style>
