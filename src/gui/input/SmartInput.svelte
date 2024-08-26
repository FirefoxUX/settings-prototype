<script lang="ts">
  import MozInput from '@src/atoms/MozInput.svelte'
  import MozToggleable from '@src/atoms/MozToggleable.svelte'
  import ConfigStore from '@src/ConfigStore'
  import { removeObjectKey } from '@src/utils'

  export let id: string
  export let valueObj: Record<string, unknown | undefined>
  export let valueKey: string
  export let valueType: 'string' | 'number' | 'boolean' | 'auto' = 'string'
  export let canBeUndefined: boolean = false
  export let placeholder: string | undefined = undefined

  let inputValue: string = ''
  let preventInputUpdate = false

  function updateInputValue(v: unknown | undefined) {
    inputValue = v === undefined ? '' : `${v}`
  }

  function toggleUndefined() {
    if (valueObj[valueKey] === undefined) {
      valueObj[valueKey] = valueType === 'string' ? '' : 0
      preventInputUpdate = false
    } else {
      preventInputUpdate = true
      valueObj = removeObjectKey(valueObj, valueKey)
    }
  }

  function resetInputValue() {
    if (preventInputUpdate) return
    updateInputValue(valueObj[valueKey])
  }

  function trySubmit() {
    if (preventInputUpdate) return
    if (valueType === 'string') {
      valueObj[valueKey] = inputValue
    } else if (valueType === 'number') {
      const num = Number(inputValue)
      if (isNaN(num)) {
        resetInputValue()
      } else {
        valueObj[valueKey] = num
      }
    } else if (valueType === 'boolean') {
      valueObj[valueKey] = inputValue === 'true'
    } else {
      // detect whether its (in this order): number, boolean, string and parse appropriately
      const num = Number(inputValue)
      if (!isNaN(num)) {
        valueObj[valueKey] = num
      } else if (
        inputValue.toLowerCase() === 'true' ||
        inputValue.toLowerCase() === 'false'
      ) {
        valueObj[valueKey] = inputValue === 'true'
      } else {
        valueObj[valueKey] = inputValue
      }
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      resetInputValue()
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      trySubmit()
    }
  }

  $: updateInputValue(valueObj[valueKey])
</script>

<div class="wrapper">
  {#if canBeUndefined}
    <MozToggleable
      id={`${id}-toggle`}
      checked={valueObj[valueKey] !== undefined}
      on:change={toggleUndefined}
    />
  {/if}
  <MozInput
    {id}
    {placeholder}
    disabled={valueObj[valueKey] === undefined}
    bind:value={inputValue}
    on:blur={trySubmit}
    on:keydown={handleKeydown}
  />
</div>

<style lang="sass">
.wrapper
  display: flex
  align-items: center
  gap: utils.$size-4
</style>
