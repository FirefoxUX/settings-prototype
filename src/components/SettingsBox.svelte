<script lang="ts">
  import MozIcon from '@src/atoms/MozIcon.svelte'

  export let subpageLabel: string | undefined = undefined
  export let subpageDisabled: boolean = false
</script>

<div class="settings-box">
  <div class="content" class:has-subpage={subpageLabel}><slot /></div>
  {#if subpageLabel}
    <button on:click disabled={subpageDisabled} class="subpage-button"
      >{subpageLabel}<MozIcon name="chevron-right-16" /></button
    >
  {/if}
</div>

<style lang="sass">
.settings-box
  display: grid
  grid-template-columns: 1fr auto
  flex-grow: 1

.content, .subpage-button
  padding: utils.$size-16

.content.has-subpage
  border-right: 1px solid var(--border-color-default)

.subpage-button
  appearance: none
  border: 1px solid var(--button-border-color)
  background: none
  display: flex
  gap: utils.$size-8
  align-items: center
  text-align: start
  border-top-right-radius: calc( var(--border-radius-medium) - 1px )
  border-bottom-right-radius: calc( var(--border-radius-medium) - 1px )
  > :global(.moz-icon)
    color: var(--icon-color)
  &:focus-visible
    outline: var(--focus-outline)
  &:hover
    background-color: var(--button-background-color-hover)
    border-color: var(--button-border-color-hover)
    color: var(--button-text-color-hover)
  &:active
    background-color: var(--button-background-color-active)
    border-color: var(--button-border-color-active)
    color: var(--button-text-color-active)
  &:disabled
    opacity: 0.4
    background-color: var(--button-background-color-disabled)
    border-color: var(--button-border-color-disabled)
    color: var(--button-text-color-disabled)
</style>
