<script lang="ts">
  import MozIcon from '@src/atoms/MozIcon.svelte'

  export let label: string | undefined = undefined
  export let description: string | undefined = undefined
  export let iconName: string | undefined = undefined
  export let disabled: boolean = false
</script>

<button {disabled} class="subpage-button" on:click
  ><div class="content" class:has-icon={iconName}>
    <slot>
      {#if iconName}
        <MozIcon name={iconName} />
      {/if}
      <span>
        {label}
      </span>
      {#if description}
        <p>{description}</p>
      {/if}
    </slot>
  </div>
  <MozIcon name="chevron-right-16" /></button
>

<style lang="sass">

.subpage-button
  appearance: none
  border: 1px solid var(--button-border-color)
  background: none
  display: flex
  gap: utils.$size-8
  padding: utils.$size-16
  align-items: center
  border-radius: calc( var(--border-radius-medium) - 1px )
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

.content
  text-align: start
  flex-grow: 1
  display: grid
  grid-template-columns: auto 1fr
  gap: utils.$size-2 utils.$size-8
  align-items: center

.content.has-icon span
  grid-column: 2
  grid-row: 1

p
  color: var(--text-color-deemphasized)
  grid-column: 2
  grid-row: 2
</style>
