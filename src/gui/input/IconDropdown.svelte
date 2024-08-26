<script lang="ts">
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import MozIcon, { iconNames } from '@src/atoms/MozIcon.svelte'
  import ConfigStore from '@src/ConfigStore'
  import { removeObjectKey } from '@src/utils'

  interface SelectItem {
    value: string | undefined
    label: string
    disabled?: boolean
  }

  export let id: string
  export let valueObj: Record<string, unknown | undefined>
  export let valueKey: string
  export let canBeUndefined: boolean = false

  let iconOptions: SelectItem[] = []
  let inputValue: string | undefined = valueObj[valueKey] as string | undefined

  function generateIconOptions(v: string | undefined): SelectItem[] {
    return [
      // if the value is undefined or canBeUndefined is true, add a None option
      ...(canBeUndefined || valueObj[valueKey] === undefined
        ? [
            {
              value: undefined,
              label: 'None',
              disabled: !canBeUndefined,
            },
          ]
        : []),
      ...iconNames.map((icon) => ({
        value: icon,
        label: icon,
      })),
    ]
  }

  function updateInputValue(v: string | undefined) {
    if (v === undefined) {
      delete valueObj[valueKey]
      valueObj = removeObjectKey(valueObj, valueKey)
    } else {
      valueObj[valueKey] = v
    }
  }

  $: inputValue = valueObj[valueKey] as string | undefined
  $: iconOptions = generateIconOptions(valueObj[valueKey] as string | undefined)
</script>

<div class="wrapper">
  {#if inputValue}
    <MozIcon name={inputValue} />
  {/if}
  <MozDropdown
    {id}
    fillWidth
    items={iconOptions}
    bind:value={inputValue}
    on:change={() => updateInputValue(inputValue)}
  />
</div>

<style lang="sass">
.wrapper
  display: flex
  align-items: center
  gap: utils.$size-4
</style>
