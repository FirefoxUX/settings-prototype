<script lang="ts">
  import FirefoxLogo from '@src/assets/firefox-24.svg?raw'
  import MozIcon from '@src/atoms/MozIcon.svelte'

  import configStore, { SEARCH_PAGE_ID } from '@src/ConfigStore'
  import { SEPARATOR } from '@src/config-schema'
  import MozInput from '@src/atoms/MozInput.svelte'

  $: currentRootPage = $configStore.path[0]

  let buttonElements: HTMLButtonElement[] = []

  // moves to the previous or next page in the sidebar if possible with key down or up
  function handleKeydown(e: KeyboardEvent) {
    const direction = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0
    if (direction === 0) return
    // determine the index of the current page in the sidebar
    let currentIndex
    if (currentRootPage === SEARCH_PAGE_ID) {
      currentIndex = 0
    } else {
      currentIndex =
        $configStore.config.sidebarNavigation.indexOf(currentRootPage)
    }
    // search for the next page tha is not a seperator or until the end of the sidebar
    do {
      const nextIndex: number = currentIndex + direction
      if (
        nextIndex < 0 ||
        nextIndex >= $configStore.config.sidebarNavigation.length
      )
        return
      if ($configStore.config.sidebarNavigation[nextIndex] !== SEPARATOR) {
        configStore.goToPage($configStore.config.sidebarNavigation[nextIndex])
        buttonElements[nextIndex].focus()
        return
      }
      currentIndex = nextIndex
    } while (true)
  }

  function getTabindex(sidebarItem: string, index: number) {
    if (sidebarItem === currentRootPage) {
      return 0
    }
    if (index === 0 && currentRootPage === SEARCH_PAGE_ID) {
      return 0
    }
    return -1
  }
</script>

<nav>
  <h1><MozIcon svg={FirefoxLogo} />Settings</h1>

  <MozInput disabled value="" iconName="search-16" placeholder="Search" clearButton />

  <div class="navigation-group" role="tablist" aria-orientation="vertical">
    {#each $configStore.config.sidebarNavigation as sidebarItem, i}
      {#if sidebarItem === SEPARATOR}
        <hr />
      {:else}
        <button
          on:keydown={handleKeydown}
          on:click={() => configStore.goToPage(sidebarItem)}
          bind:this={buttonElements[i]}
          role="tab"
          aria-selected={sidebarItem === currentRootPage}
          tabindex={getTabindex(sidebarItem, i)}
          class:text-bold={sidebarItem === currentRootPage}
          ><MozIcon
            name={$configStore.config.pageDefinitions[sidebarItem].icon}
          />{$configStore.config.pageDefinitions[sidebarItem].title}</button
        >
      {/if}
    {/each}
  </div>
</nav>

<style lang="sass">

  nav
    display: flex
    flex-direction: column
    padding-inline: utils.$size-48
    padding-block: utils.$size-32
    width: 256px // TODO
    gap: utils.$size-32
  h1
    display: flex
    align-items: center
    gap: utils.$size-8

  hr
    border: none
    border-top: 1px solid var(--border-color-default)

  .navigation-group
    display: flex
    flex-direction: column
    gap: utils.$size-8
    button
      display: flex
      align-items: center
      text-align: start
      padding-block: utils.$size-8
      padding-inline: utils.$size-12
      gap: utils.$size-12
      position: relative
      overflow: hidden
      border: 1px solid var(--button-border-color-ghost)
      border-radius: utils.$size-4
      background-color: var(--button-background-color-ghost)
      &:focus-visible
        outline: var(--focus-outline)
        outline-offset: var(--focus-outline-offset)
      &:hover
        color: var(--button-text-color-ghost-hover)
        border-color: var(--button-border-color-ghost-hover)
        background-color: var(--button-background-color-ghost-hover)
      &:active
        color: var(--button-text-color-ghost-active)
        border-color: var(--button-border-color-ghost-active)
        background-color: var(--button-background-color-ghost-active)
      &:disabled
        color: var(--button-text-color-ghost-disabled)
        border-color: var(--button-border-color-ghost-disabled)
        background-color: var(--button-background-color-ghost-disabled)
      &[aria-selected="true"]
        color: var(--color-accent-primary)
        background-color: var(--button-background-color)
        border-color: var(--button-border-color)
        &::before
          content: ""
          position: absolute
          top: 0
          left: 0
          bottom: 0
          width: utils.$size-4
          background-color: var(--color-accent-primary)
        &:hover
          color: var(--color-accent-primary-hover)
          background-color: var(--button-background-color-hover)
          border-color: var(--button-border-color-hover)
        &:active
          color: var(--color-accent-primary-active)
          background-color: var(--button-background-color-active)
          border-color: var(--button-border-color-active)
        &:disabled
          color: var(--color-accent-primary-disabled)
          background-color: var(--button-background-color-disabled)
          border-color: var(--button-border-color-disabled)


</style>
