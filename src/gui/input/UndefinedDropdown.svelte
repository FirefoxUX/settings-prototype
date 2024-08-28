<script lang="ts">
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import ConfigStore from '@src/ConfigStore'
  import { removeObjectKey } from '@src/utils'

  type T = $$Generic
  interface SelectItem {
    value: T
    label: string
    disabled?: boolean
  }

  export let id: string
  export let disabled: boolean = false
  export let items: SelectItem[]
  export let fillWidth = true
  export let valueObj: Record<string, T | undefined>
  export let valueKey: string
  export let unsetLabel: string | undefined = 'Unset'

  let inputValue: T | undefined = valueObj[valueKey]

  function generateItems() {
    // return items but also an option to set it to undefined
    return [
      {
        value: undefined,
        label: unsetLabel || 'Unset',
      },
      ...items,
    ]
  }

  function updateInputValue(v: T | undefined) {
    if (v === undefined) {
      delete valueObj[valueKey]
      valueObj = removeObjectKey(valueObj, valueKey)
    } else {
      valueObj[valueKey] = v
    }
  }

  $: generatedItems = generateItems()
</script>

<MozDropdown
  {id}
  {fillWidth}
  items={generatedItems}
  {disabled}
  bind:value={inputValue}
  on:change={() => updateInputValue(inputValue)}
/>


