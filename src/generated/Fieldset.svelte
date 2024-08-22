<script lang="ts">
  import type { CardContentConfig } from '@src/generated/CardContent.svelte'
  import CardContent from '@src/generated/CardContent.svelte'

  export let title: string
  export let content: CardContentConfig[]
</script>

<fieldset>
  <legend class="text-bold">{title}</legend>
  {#each content as item}
    <CardContent config={item} />
  {/each}
</fieldset>

<style lang="sass">

fieldset
  margin: 0
  padding: 0
  border: 0
  display: flex
  flex-direction: column
  gap: utils.$size-12

legend
  margin-block-end: utils.$size-12

</style>
