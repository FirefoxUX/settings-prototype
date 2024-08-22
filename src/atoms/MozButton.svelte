<script lang="ts">
  import MozIcon from './MozIcon.svelte'

  const SLOTS = $$props.$$slots

  export let type: 'default' | 'primary' | 'destructive' | 'ghost' = 'default'
  export let iconName: string | undefined = undefined
  export let disabled: boolean = false
</script>

<button
  class={type}
  class:iconName
  class:icon-only={!SLOTS?.default}
  {disabled}
  on:click
  on:blur
  on:focus
>
  {#if iconName}
    <MozIcon name={iconName} />
  {/if}
  <slot />
</button>

<style lang="sass">
  button
    appearance: none
    min-height: var(--button-min-height)
    border-radius: 4px
    font-weight: var(--button-font-weight)
    padding: .45em 1em
    text-decoration: none
    font-size: 1em
    background-color: var(--button-background-color)
    border: 1px solid var(--button-border-color)
    color: var(--button-text-color)
    display: inline-flex
    align-items: center
    justify-content: center
    vertical-align: middle
    flex-wrap: wrap
    gap: utils.$size-4
    &.icon
      padding-inline-start: utils.$size-12
    &.icon-only
      padding-inline: 0
      aspect-ratio: 1
    &:focus-visible
      outline: var(--focus-outline)
      outline-offset: var(--focus-outline-offset)
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
    &.ghost
      background-color: var(--button-background-color-ghost)
      border-color: var(--button-border-color-ghost)
      color: var(--button-text-color-ghost)
      &:hover
        background-color: var(--button-background-color-ghost-hover)
        border-color: var(--button-border-color-ghost-hover)
        color: var(--button-text-color-ghost-hover)
      &:active
        background-color: var(--button-background-color-ghost-active)
        border-color: var(--button-border-color-ghost-active)
        color: var(--button-text-color-ghost-active)
      &:disabled
        background-color: var(--button-background-color-ghost-disabled)
        border-color: var(--button-border-color-ghost-disabled)
        color: var(--button-text-color-ghost-disabled)
    &.primary
      background-color: var(--button-background-color-primary)
      border-color: var(--button-border-color-primary)
      color: var(--button-text-color-primary)
      &:hover
        background-color: var(--button-background-color-primary-hover)
        border-color: var(--button-border-color-primary-hover)
        color: var(--button-text-color-primary-hover)
      &:active
        background-color: var(--button-background-color-primary-active)
        border-color: var(--button-border-color-primary-active)
        color: var(--button-text-color-primary-active)
      &:disabled
        background-color: var(--button-background-color-primary-disabled)
        border-color: var(--button-border-color-primary-disabled)
        color: var(--button-text-color-primary-disabled)
    &.destructive
      background-color: var(--button-background-color-destructive)
      border-color: var(--button-border-color-destructive)
      color: var(--button-text-color-destructive)
      &:hover
        background-color: var(--button-background-color-destructive-hover)
        border-color: var(--button-border-color-destructive-hover)
        color: var(--button-text-color-destructive-hover)
      &:active
        background-color: var(--button-background-color-destructive-active)
        border-color: var(--button-border-color-destructive-active)
        color: var(--button-text-color-destructive-active)
      &:disabled
        background-color: var(--button-background-color-destructive-disabled)
        border-color: var(--button-border-color-destructive-disabled)
        color: var(--button-text-color-destructive-disabled)
</style>
