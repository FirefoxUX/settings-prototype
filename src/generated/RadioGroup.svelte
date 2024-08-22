<script lang="ts">
  import InputLabel from '@src/components/InputLabel.svelte'
  import prefStore from '@src/PrefStore'
  import { generateId } from '@src/utils'

  type Item = {
    value: string | number | boolean
    label: InputLabel['label']
    description?: InputLabel['description']
    learnMore?: InputLabel['learnMore']
  }

  const radioName = generateId()

  export let pref: string
  export let items: Item[] = []
</script>

<div role="radiogroup">
  {#each items as item}
    <InputLabel
      type="radio"
      name={radioName}
      label={item.label}
      checked={$prefStore[pref] === item.value}
      description={item.description}
      learnMore={item.learnMore}
      on:change={() => ($prefStore[pref] = item.value)}
    />
  {/each}
</div>

<style lang="sass">
div > :global(*:not(:last-child))
    margin-block-end: utils.$size-8
</style>
