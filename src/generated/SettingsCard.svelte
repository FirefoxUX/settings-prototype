<script lang="ts" context="module">
  export type CardConfig = {
    header?: {
      title: string
      iconName?: string
      description?: string
      learnMore?: string
    }
    content: CardContentConfig[]
  }
</script>

<script lang="ts">
  import CardHeader from '@src/components/CardHeader.svelte'
  import CustomComponent from './CustomComponent.svelte'
  import type { CardContentConfig } from './CardContent.svelte'
  import CardContent from './CardContent.svelte'

  export let content: CardConfig
</script>

<section class="moz-card padding layout">
  {#if content.header}
    <CardHeader {...content.header} />
  {/if}
  {#each content.content as item}
    <CardContent config={item} />
  {/each}
</section>


