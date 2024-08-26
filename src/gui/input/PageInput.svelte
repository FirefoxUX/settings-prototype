<script lang="ts">
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import configStore from '@src/ConfigStore'
  import UndefinedDropdown from './UndefinedDropdown.svelte'
  import { removeObjectKey } from '@src/utils'

  type PageList = (typeof $configStore)['config']['pageDefinitions']

  export let id: string
  export let valueObj: Record<string, unknown | undefined>
  export let valueKey: string
  export let canBeUndefined: boolean = false

  interface SelectItem {
    value: string | undefined
    label: string
    disabled?: boolean
  }

  let options: SelectItem[] = []
  let inputValue: string | undefined = valueObj[valueKey] as string | undefined

  function generateOptions(pageList: PageList, v: string) {
    // if the value is a string thats not in the pref store, add it to the list but add a warning
    const newOptiosn: SelectItem[] = Object.keys(pageList).map((key) => ({
      value: key,
      label: key,
    }))
    if (v && !pageList[v]) {
      newOptiosn.push({
        value: v,
        label: `${v} (not in pages!)`,
      })
    }
    if (v === undefined || canBeUndefined) {
      newOptiosn.push({
        value: undefined,
        label: 'None',
        disabled: !canBeUndefined,
      })
    }
    options = newOptiosn
  }

  function updateInputValue(v: string | undefined) {
    if (v === undefined) {
      delete valueObj[valueKey]
      valueObj = removeObjectKey(valueObj, valueKey)
    } else {
      valueObj[valueKey] = v
    }
  }

  $: generateOptions(
    $configStore.config.pageDefinitions,
    valueObj[valueKey] as string,
  )
</script>

<MozDropdown
  {id}
  bind:value={inputValue}
  items={options}
  fillWidth
  on:change={() => updateInputValue(inputValue)}
/>

<style lang="sass">

</style>
