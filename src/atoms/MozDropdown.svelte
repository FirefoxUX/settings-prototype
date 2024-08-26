<script lang="ts">
  import MozIcon from './MozIcon.svelte'
  import ChevronDown16 from '@src/assets/fx-icons/chevron-down-16.svg?raw'

  type T = $$Generic
  interface SelectItem {
    value: T
    label: string
    disabled?: boolean
  }

  export let id: string
  export let disabled: boolean = false
  export let value: T | undefined
  export let items: SelectItem[]
  export let fillWidth = false

  function noValue(val: T | undefined) {
    return val === undefined || val === ''
  }
</script>

<div class="wrapper" class:fill={fillWidth}>
  <select {id} {disabled} bind:value on:change>
    {#if noValue(value)}
      <option value="" disabled selected hidden></option>
    {/if}
    {#each items as item}
      <option value={item.value} disabled={item.disabled}>{item.label}</option>
    {/each}
  </select>
  <span role="presentation" class="dropdown">{@html ChevronDown16}</span>
</div>

<style lang="sass">
  .wrapper
    position: relative
    display: inline-block
  select
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
    box-sizing: border-box
    padding-inline-end: (utils.$size-8 * 3) + utils.$size-16
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

.fill
  width: 100%
  select
    width: 100%

.dropdown
  pointer-events: none
  position: absolute
  line-height: 0
  right: 0
  top: 0
  bottom: 0
  display: flex
  align-items: center
  margin-inline: utils.$size-12
  color: var(--icon-color)
</style>
