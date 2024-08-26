<script lang="ts">
  import MozDropdown from '@src/atoms/MozDropdown.svelte'
  import prefStore from '@src/PrefStore'

  export let id: string
  export let value: string | undefined
  export let disallowedTypes: ('string' | 'number' | 'boolean')[] = []

  interface SelectItem {
    value: string | undefined
    label: string
    disabled?: boolean
  }

  let options: SelectItem[] = []

  function generateOptions(prefStore: typeof $prefStore, v: typeof value) {
    // if the value is a string thats not in the pref store, add it to the list but add a warning
    let filteredCurrent = false
    const newOptiosn: SelectItem[] = Object.keys(prefStore)
      .filter((key) => {
        const type = typeof prefStore[key]
        const isDisallowed = disallowedTypes.includes(type as any)
        if (key === v && isDisallowed) {
          filteredCurrent = true
        }
        return !isDisallowed
      })
      .map((key) => ({
        value: key,
        label: key,
      }))
    if (filteredCurrent) {
      newOptiosn.push({
        value: v,
        label: `${v} (type not allowed!)`,
      })
    } else if (v && !prefStore[v]) {
      newOptiosn.push({
        value: v,
        label: `${v} (not in prefs!)`,
      })
    }
    if (v === undefined) {
      newOptiosn.push({
        value: undefined,
        label: 'None',
        disabled: true,
      })
    }
    options = newOptiosn
  }

  $: generateOptions($prefStore, value)
</script>

<MozDropdown {id} bind:value items={options} fillWidth />

<style lang="sass">

</style>
