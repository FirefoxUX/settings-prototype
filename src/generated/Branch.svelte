<script lang="ts" context="module">
  export type ConditionalContent = {
    match: string | number | boolean
    content: CardContentConfig[]
  }
</script>

<script lang="ts">
  import type { CardContentConfig } from '@src/generated/CardContent.svelte'
  import CardContent from '@src/generated/CardContent.svelte'
  import PrefStore from '@src/PrefStore'

  export let pref: string
  export let conditions: ConditionalContent[]
</script>

{#each conditions as { match, content }}
  {#if match === $PrefStore[pref]}
    {#each content as item}
      <CardContent config={item} />
    {/each}
  {/if}
{/each}

<style lang="sass">

</style>
