<script lang="ts">
  import MozIcon from './MozIcon.svelte'

  export let value: string
  export let id: string | undefined = undefined
  export let placeholder: string | undefined = undefined
  export let disabled: boolean = false
  export let readonly: boolean = false
  export let type: string | undefined = undefined
  export let ariaDescribedby: string | undefined = undefined

  export let iconName: string | undefined = undefined
  export let clearButton: boolean = false

  let inputElement: HTMLInputElement

  $: showClearButton = clearButton && value.length > 0

  function clear() {
    value = ''
    inputElement.focus()
  }

  function setType(
    type: string | undefined,
    element: HTMLInputElement | undefined,
  ) {
    if (type && element) {
      element.setAttribute('type', type)
    }
    if (!type && element) {
      element.removeAttribute('type')
    }
  }

  $: setType(type, inputElement)
</script>

<div
  class="input-wrapper"
  class:has-clear-button={showClearButton}
  class:has-icon={iconName}
>
  {#if iconName}
    <MozIcon name={iconName} />
  {/if}
  <input
    type="text"
    bind:value
    bind:this={inputElement}
    {placeholder}
    {disabled}
    {readonly}
    {id}
    aria-describedby={ariaDescribedby}
    on:keydown
    on:blur
  />
  {#if showClearButton}
    <button on:click={clear} title="clear"
      ><MozIcon name="close-circle-fill-16" /></button
    >
  {/if}
</div>

<style lang="sass">
  .input-wrapper
    display: flex
    width: 100%
    position: relative
    > button, > :global(.moz-icon)
      position: absolute
      top: 50%
      transform: translateY(-50%)
      color: var(--icon-color)
    > :global(.moz-icon)
      left: utils.$size-12
    > button
      right: utils.$size-12
      line-height: 0
      border: none
      background: none
      border-radius: var(--border-radius-circle)
      &:focus-visible
        outline: var(--focus-outline)
        outline-offset: var(--focus-outline-offset)


  input
    width: 100%
    border: 1px solid var(--border-color-interactive)
    border-radius: var(--border-radius-small)
    padding-block: utils.$size-8
    padding-inline: utils.$size-12
    font: inherit
    box-sizing: border-box
    &:focus-visible
      outline: var(--focus-outline)


  .has-icon input
    padding-inline-start: utils.$size-32
  .has-clear-button input
    padding-inline-end: utils.$size-32
</style>
